import serializer from "../serializer";
import SSASubtitle from "../SSASubtitle";

import eventsParser from "./events";
import scriptInfoParser from "./info";
import stylesV4Parser from "./styles";

const parser = (content: string) => {
  const parts = content.split(/\r?\n\s*\r?\n/);

  return parts.reduce(
    (subtitle, part) => {
      const regex = /^\s*\[([^\]]+)\]\r?\n([\s\S]*)(\r?\n)*$/gi;
      const match = regex.exec(part);

      if (match) {
        const [, tag, text] = match;
        const lines = text.split(/\r?\n/);

        switch (tag) {
          case "Script Info":
            subtitle["Script Info"] = scriptInfoParser(lines);
            if (subtitle["Script Info"].ScriptType !== "v4.00+") {
              throw new Error(
                "Older versions of the SSA format are not allowed.",
              );
            }
            break;
          case "V4+ Styles":
            subtitle["V4+ Styles"] = stylesV4Parser(lines);
            break;
          case "Events":
            subtitle.Events = eventsParser(lines);
            break;
          default:
            break;
        }
      }

      return subtitle;
    },
    {
      toString() {
        return serializer(this);
      },
    } as SSASubtitle,
  );
};

export default parser;
