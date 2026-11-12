import { readFileSync, writeFileSync } from 'node:fs';
import { rowDataDesktop, rowDataMobile } from './cards.mjs';

const token = process.env.GITHUB_TOKEN;
const owner = process.env.GITHUB_REPOSITORY_OWNER ?? 'SantaChains';

async function api(path) {
  const headers = {
    Accept: 'application/vnd.github+json',
    'User-Agent': 'santachains-profile',
  };
  if (token) headers.Authorization = `Bearer ${token}`;
  const response = await fetch(`https://api.github.com${path}`, { headers });
  if (!response.ok) throw new Error(`${response.status} ${response.statusText} for ${path}`);
  return response.json();
}

async function publicRepos() {
  const collected = [];
  for (let page = 1; page <= 5; page++) {
    const batch = await api(`/users/${owner}/repos?type=owner&per_page=100&page=${page}`);
    collected.push(...batch);
    if (batch.length < 100) break;
  }
  return collected.filter(repo => !repo.private && !repo.fork && !repo.archived);
}

async function contributionCalendar() {
  if (!token) return null;
  const query = `query($login:String!){ user(login:$login){ contributionsCollection { contributionCalendar { totalContributions weeks { contributionDays { contributionCount } } } } } }`;
  const response = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      'User-Agent': 'santachains-profile',
    },
    body: JSON.stringify({ query, variables: { login: owner } }),
  });
  if (!response.ok) {
    console.warn(`graphql ${response.status}; contribution heatmap skipped`);
    return null;
  }
  const payload = await response.json();
  if (payload.errors) {
    console.warn(`${payload.errors.map(error => error.message).join('; ')}; contribution heatmap skipped`);
    return null;
  }
  const calendar = payload.data?.user?.contributionsCollection?.contributionCalendar;
  if (!calendar) return null;
  return {
    total: calendar.totalContributions,
    weeks: calendar.weeks.map(week => week.contributionDays.map(day => day.contributionCount)),
  };
}

function countLanguages(repositories) {
  const counts = new Map();
  for (const { language } of repositories) {
    if (language) counts.set(language, (counts.get(language) ?? 0) + 1);
  }
  const ranked = [...counts].sort(([left, a], [right, b]) => b - a || left.localeCompare(right, 'en'));
  const leading = ranked.slice(0, 3);
  if (ranked.length > 3) {
    leading.push(['Other', ranked.slice(3).reduce((sum, [, count]) => sum + count, 0)]);
  }
  const total = leading.reduce((sum, [, count]) => sum + count, 0);
  if (!total) return [];

  const shares = leading.map(([language, count]) => ({
    language,
    count,
    percent: Math.floor(count * 100 / total),
    remainder: (count * 100) % total,
  }));
  const missing = 100 - shares.reduce((sum, share) => sum + share.percent, 0);
  [...shares].sort((a, b) => b.remainder - a.remainder).slice(0, missing).forEach(share => share.percent++);
  return shares;
}

function isoWeek(date = new Date()) {
  const target = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
  const day = target.getUTCDay() || 7;
  target.setUTCDate(target.getUTCDate() + 4 - day);
  const yearStart = new Date(Date.UTC(target.getUTCFullYear(), 0, 1));
  const week = Math.ceil(((target - yearStart) / 86400000 + 1) / 7);
  return `${target.getUTCFullYear()}-W${String(week).padStart(2, '0')}`;
}

const user = await api(`/users/${owner}`);
const repositories = await publicRepos();
const contributions = await contributionCalendar();
const stars = repositories.reduce((sum, repo) => sum + repo.stargazers_count, 0);
const metrics = [
  ['STARS / 星标', stars],
  ['FOLLOWERS / 关注', user.followers],
  ['SOURCE REPOS / 仓库', repositories.length],
];
const languages = countLanguages(repositories);
const week = isoWeek();
const date = new Intl.DateTimeFormat('en-CA', { timeZone: 'UTC' }).format(new Date());

writeFileSync(new URL('../assets/row-data.svg', import.meta.url),
  rowDataDesktop(metrics, languages, week, date, contributions));
writeFileSync(new URL('../assets/row-data-mobile.svg', import.meta.url),
  rowDataMobile(metrics, languages, week, date, contributions));

const readmeUrl = new URL('../README.md', import.meta.url);
const readme = readFileSync(readmeUrl, 'utf8');
const stamp = `?v=${week}`;
writeFileSync(readmeUrl, readme
  .replace(/assets\/row-data-mobile\.svg(\?v=[\w-]+)?/g, `assets/row-data-mobile.svg${stamp}`)
  .replace(/assets\/row-data\.svg(\?v=[\w-]+)?/g, `assets/row-data.svg${stamp}`));

console.log(`rendered row-data for ${week} (${date})`);
