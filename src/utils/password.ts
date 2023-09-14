import * as bcrypt from "bcrypt";

export class Password {
  /**
   * @param data
   */
  public static async hash(data: string): Promise<string> {
    return bcrypt.hash(data, 10);
  }

  /**
   * @param hash
   * @param plaintext
   */
  public static async check(hash: string, plaintext: string): Promise<boolean> {
    return await bcrypt.compare(plaintext, hash);
  }
}
