import Color from "@tiptap/extension-color";
import Dropcursor from "@tiptap/extension-dropcursor";
import Highlight from "@tiptap/extension-highlight";
import Image from "@tiptap/extension-image";
import Table from "@tiptap/extension-table";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import TableRow from "@tiptap/extension-table-row";
import TaskItem from "@tiptap/extension-task-item";
import TaskList from "@tiptap/extension-task-list";
import TextAlign from "@tiptap/extension-text-align";
import TextStyle from "@tiptap/extension-text-style";
import Typography from "@tiptap/extension-typography";
import Underline from "@tiptap/extension-underline";
import StarterKit from "@tiptap/starter-kit";

// Custom table cell with background color support
const CustomTableCell = TableCell.extend({
  addAttributes() {
    return {
      // extend the existing attributes
      ...this.parent?.(),

      // add background color attribute
      backgroundColor: {
        default: null,
        parseHTML: (element) => element.getAttribute("data-background-color"),
        renderHTML: (attributes) => {
          return {
            "data-background-color": attributes.backgroundColor,
            style: `background-color: ${attributes.backgroundColor}`,
          };
        },
      },
    };
  },
});

// Configure all extensions together
export const getExtensions = () => [
  StarterKit,
  TextAlign.configure({
    types: ["paragraph", "heading"],
    defaultAlignment: "left",
  }),
  Underline,
  Image,
  Dropcursor,
  Table.configure({
    resizable: true,
  }),
  TableRow,
  TableHeader,
  CustomTableCell,
  TaskList,
  TaskItem.configure({
    nested: true,
  }),
  Highlight,
  Typography,
  TextStyle,
  Color,
];

// Export common content types for reference
export const tableHTML = `
  <table>
    <tr>
      <th>Header 1</th>
      <th>Header 2</th>
      <th>Header 3</th>
    </tr>
    <tr>
      <td>Cell 1</td>
      <td>Cell 2</td>
      <td>Cell 3</td>
    </tr>
    <tr>
      <td>Cell 4</td>
      <td>Cell 5</td>
      <td>Cell 6</td>
    </tr>
  </table>
`;

export const taskListHTML = `
  <ul data-type="taskList">
    <li data-type="taskItem" data-checked="false">Task 1</li>
    <li data-type="taskItem" data-checked="false">Task 2</li>
    <li data-type="taskItem" data-checked="false">Task 3</li>
  </ul>
`;
