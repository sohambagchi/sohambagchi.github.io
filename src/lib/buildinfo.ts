// The footer's "Updated" line: the last commit date when git is available, otherwise the build time.
import { execFileSync } from 'node:child_process';

function lastCommit(): Date | null {
  try {
    const iso = execFileSync('git', ['log', '-1', '--format=%cI'], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim();
    const d = new Date(iso);
    return Number.isNaN(d.getTime()) ? null : d;
  } catch {
    return null;
  }
}

export const buildDate = new Date();
export const updatedDate = lastCommit() ?? buildDate;
