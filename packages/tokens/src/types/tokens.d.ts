export interface TokenAttributes {
  themes: Record<string, string>;
}

export interface ParsedToken {
  value: any;
  type?: string;
  name?: string;
  comment?: string;
  attributes?: TokenAttributes;
  /**
   * When flattening tokens, DesignToken is given a key that matches the original ancestor tree e.g. `{colors.red.500}`
   */
  key?: string;
  [key: string]: any;
}

export interface ParsedTokens {
  type?: string;
  [key: string]: ParsedTokens | ParsedToken | string | undefined;
}
