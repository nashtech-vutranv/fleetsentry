import { Command, CommandRunner } from "nest-commander";

@Command({ name: "basic" })
export class BasicCommand extends CommandRunner {
  public async run(): Promise<void> {
    console.log("Running Basic command");
    process.exit(1);
  }
}
