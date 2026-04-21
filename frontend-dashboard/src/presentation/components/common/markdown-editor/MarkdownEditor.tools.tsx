import { Bold, Italic, Strikethrough, Heading1, Heading2, Heading3, List, ListOrdered, Code, Code2, Link, Quote, Minus, Table } from "lucide-react";

export interface Tool {
  icon: React.ReactNode;
  prefix: string;
  suffix: string;
  title: string;
}

export interface ToolGroup {
  title: string;
  tools: Tool[];
}

export const TOOL_GROUPS: ToolGroup[] = [
  {
    title: "Texto",
    tools: [
      { icon: <Bold size={14} />, prefix: "**", suffix: "**", title: "Negrita" },
      { icon: <Italic size={14} />, prefix: "_", suffix: "_", title: "Cursiva" },
      { icon: <Strikethrough size={14} />, prefix: "~~", suffix: "~~", title: "Tachado" },
    ],
  },
  {
    title: "Headings",
    tools: [
      { icon: <Heading1 size={14} />, prefix: "# ", suffix: "", title: "Título 1" },
      { icon: <Heading2 size={14} />, prefix: "## ", suffix: "", title: "Título 2" },
      { icon: <Heading3 size={14} />, prefix: "### ", suffix: "", title: "Título 3" },
    ],
  },
  {
    title: "Listas",
    tools: [
      { icon: <List size={14} />, prefix: "- ", suffix: "", title: "Lista" },
      { icon: <ListOrdered size={14} />, prefix: "1. ", suffix: "", title: "Lista numerada" },
    ],
  },
  {
    title: "Bloques",
    tools: [
      { icon: <Code size={14} />, prefix: "`", suffix: "`", title: "Código inline" },
      { icon: <Code2 size={14} />, prefix: "```\n", suffix: "\n```", title: "Bloque de código" },
      { icon: <Quote size={14} />, prefix: "> ", suffix: "", title: "Cita" },
      { icon: <Minus size={14} />, prefix: "\n---\n", suffix: "", title: "Separador" },
    ],
  },
  {
    title: "Insertar",
    tools: [
      { icon: <Link size={14} />, prefix: "[", suffix: "](url)", title: "Enlace" },
      { icon: <Table size={14} />, prefix: "| Columna 1 | Columna 2 |\n|---|---|\n| ", suffix: " | |", title: "Tabla" },
    ],
  },
];