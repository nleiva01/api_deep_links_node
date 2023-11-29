import fs from 'fs';

export class Helper {
  public static createFileIfNotExist(path: fs.PathLike | string): void {
    if (!fs.existsSync(path)) {
      const defaultData: any = [];
      fs.writeFileSync(path, JSON.stringify(defaultData, null, 2));
    }
  }
}