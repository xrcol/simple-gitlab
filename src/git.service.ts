import { Injectable } from '@nestjs/common';
import { promisify } from 'util';
import { exec as execCallback } from 'child_process';

type File = { name: string; type: 'file' | 'folder'; path: string };
@Injectable()
export class GitService {
  async index(path: string): Promise<any> {
    const exec = promisify(execCallback);
    const base = 'C:/Users/Downloads/test.git';
    const command = path ? `git ls-tree master:${path}` : 'git ls-tree master';
    const { stdout } = await exec(command, {
      cwd: base,
    });
    const output = stdout.split('\n').filter((line) => line);
    const res: File[] = [];
    for (let i = 0; i < output.length; i++) {
      const type = output[i].split(' ')[1];
      const name = output[i].split('\t')[1];
      res.push({
        name,
        type: type === 'blob' ? 'file' : 'folder',
        path: path ? `${path}/${name}` : name,
      });
    }
    return { files: res };
  }

  async show(path: string): Promise<any> {
    const exec = promisify(execCallback);
    const base = 'C:/Users/Downloads/test.git';
    const isPdf = path.endsWith('.pdf');
    if (isPdf) {
      const { stdout } = await exec(`git show master:${path}`, {
        cwd: base,
        encoding: 'buffer',
        maxBuffer: 1024 * 1024 * 1024,
      });
      return { content: stdout.toString('base64'), path };
    } else {
      const { stdout } = await exec(`git show master:${path}`, {
        cwd: base,
      });
      return { content: stdout, path };
    }
  }
}
