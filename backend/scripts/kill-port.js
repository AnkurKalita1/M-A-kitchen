#!/usr/bin/env node

/**
 * Script to kill any process running on a specific port
 * Usage: node scripts/kill-port.js [port]
 * Default port: 5001 (matches server.js default)
 */

import { exec } from 'child_process';
import { promisify } from 'util';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Load .env to get PORT if set
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const envPath = join(__dirname, '..', '.env');
dotenv.config({ path: envPath });

const execAsync = promisify(exec);

// Use PORT from env, command line arg, or default to 5001 (matching server.js)
const PORT = process.argv[2] || process.env.PORT || 5001;

async function checkPortFree(port) {
  try {
    const { stdout } = await execAsync(`lsof -ti:${port}`);
    return stdout.trim().split('\n').filter(Boolean);
  } catch (error) {
    // If lsof returns no results (code 1), port is free
    if (error.code === 1) {
      return [];
    }
    throw error;
  }
}

async function killPort(port) {
  try {
    // Retry mechanism: check and kill up to 3 times
    let attempts = 0;
    const maxAttempts = 3;
    
    while (attempts < maxAttempts) {
      const pids = await checkPortFree(port);
      
      if (pids.length === 0) {
        if (attempts === 0) {
          console.log(`✅ Port ${port} is free`);
        }
        // Wait a bit longer to ensure port is fully released
        await new Promise(resolve => setTimeout(resolve, 1000));
        return;
      }

      // Kill all processes using the port
      for (const pid of pids) {
        try {
          await execAsync(`kill -9 ${pid}`);
          console.log(`✅ Killed process ${pid} on port ${port}`);
        } catch (error) {
          // Process might already be dead
          if (!error.message.includes('No such process')) {
            console.log(`⚠️  Could not kill process ${pid}: ${error.message}`);
          }
        }
      }
      
      attempts++;
      
      // Wait longer between attempts to ensure port is released
      if (attempts < maxAttempts) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }
    
    // Final check
    const finalPids = await checkPortFree(port);
    if (finalPids.length === 0) {
      console.log(`✅ Port ${port} is now free`);
    } else {
      console.log(`⚠️  Port ${port} may still be in use by: ${finalPids.join(', ')}`);
      console.log(`💡 You may need to manually kill these processes`);
    }
    
    // Wait one more second to ensure port is fully released
    await new Promise(resolve => setTimeout(resolve, 1000));
  } catch (error) {
    console.error(`❌ Error checking port ${port}:`, error.message);
    // Don't exit with error - let the server try anyway
  }
}

killPort(PORT);


