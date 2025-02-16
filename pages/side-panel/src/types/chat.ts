export type ChatMode = 'conversational' | 'interactive' | 'context-menu';

export interface Message {
  role: string;
  content: string;
}

export interface TaskStep {
  description: string;
  action: 'click' | 'type' | 'navigate' | 'wait' | 'extract' | 'search';
  target?: string;
  value?: string;
  selector?: string;
  query?: string;
}

export interface TaskPlan {
  goal: string;
  steps: TaskStep[];
  estimated_time: string;
}

export interface ContextMenuAction {
  id: string;
  title: string;
  prompt: (text: string) => string;
}

export const CONTEXT_MENU_ACTIONS: ContextMenuAction[] = [
  {
    id: 'translate',
    title: 'Translate to English',
    prompt: text => `Translate the following text to English: "${text}"`,
  },
  {
    id: 'explain',
    title: 'Explain This',
    prompt: text => `Explain this in simple terms: "${text}"`,
  },
  {
    id: 'improve',
    title: 'Improve Writing',
    prompt: text => `Improve this text while maintaining its meaning: "${text}"`,
  },
  {
    id: 'summarize',
    title: 'Summarize',
    prompt: text => `Provide a concise summary of: "${text}"`,
  },
];

export interface ChatConfig {
  mode: ChatMode;
  selectedModel: string;
  contextMenuAction?: ContextMenuAction;
}

export interface ChatState {
  messages: Message[];
  isLoading: boolean;
  error: string | null;
}

export interface ChatContextValue {
  state: ChatState;
  config: ChatConfig;
  sendMessage: (content: string) => Promise<void>;
  setContextMenuAction: (action: ContextMenuAction | undefined) => void;
  setMode: (mode: ChatMode) => void;
}
