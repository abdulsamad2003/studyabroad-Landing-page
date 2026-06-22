export type ToolInput = Record<string, string | number>;

export type ToolResultItem = {
  label: string;
  value: string;
  tier?: string;
};

export type ToolResult = {
  summary: string;
  items?: ToolResultItem[];
};

export type ToolLogicFn = (input: ToolInput) => ToolResult;
