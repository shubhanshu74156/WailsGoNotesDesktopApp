import { Editor } from "@tiptap/react";

export interface AdvancedFeaturesDialProps {
  editor: Editor | null;
  onExportPdf?: () => void;
}
