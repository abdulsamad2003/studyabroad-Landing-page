export type DomainId = "studyabroad" | "ivf";

export type ToolField = {
  name: string;
  label: string;
  type: "text" | "number" | "select";
  options?: string[];
};

export type ToolDefinition = {
  fields: ToolField[];
  logicKey: string;
  /**
   * Optional React component path for a fully custom tool UI.
   * When set, ToolShell is skipped and the named component renders instead.
   * v1 uses the shared shell for all tools; this escape hatch is for future domains.
   */
  customComponent?: string;
};

export type DomainToolsConfig = {
  eligibility: ToolDefinition;
  calculator: ToolDefinition;
  predictor: ToolDefinition;
};

export type DomainConfig = {
  id: DomainId;
  name: string;
  tagline: string;
  primaryColor: string;
  secondaryColor?: string;
  logo: string;
  font?: string;
  whatsappNumber: string;
  agentId: string;
  providerType: string;
  allowedHosts: string[];
  tools: DomainToolsConfig;
  hero: {
    heading: string;
    subheading: string;
    ctaPrimary: string;
    ctaSecondary: string;
    ctaPrimaryHref: string;
  };
  sections: string[];
  navbarLinks: { label: string; href: string }[];
  mobileNavLinks: { label: string; href: string }[];
  footer: {
    links: { label: string; href: string }[];
  };
  leadFormFields: string[];
  seo: {
    title: string;
    description: string;
    keywords?: string[];
  };
};

export type AppConfig = {
  apiUrl: string;
  socketUrl: string;
};
