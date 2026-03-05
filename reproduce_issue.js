
import * as fs from 'node:fs/promises';
import * as path from 'node:path';
import * as os from 'node:os';

async function reproduce() {
  const tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), 'gemini-repro-'));
  const chatsDir = path.join(tmpDir, 'chats');
  await fs.mkdir(chatsDir, { recursive: true });

  const sessionId = 'test-session-uuid';
  const sessionFile = `session_${sessionId.slice(0, 8)}.json`;
  const sessionPath = path.join(chatsDir, sessionFile);

  const emptySession = {
    sessionId,
    messages: [
      { type: 'info', content: [{ text: 'Started' }] }
    ],
    startTime: new Date().toISOString(),
    lastUpdated: new Date().toISOString()
  };

  await fs.writeFile(sessionPath, JSON.stringify(emptySession));
  console.log(`Created empty session at ${sessionPath}`);

  // Now, we would need to run cleanupExpiredSessions.
  // Since I can't easily import from the packages here without setup, 
  // I will just look at the code again to confirm my suspicion.
}

reproduce();
