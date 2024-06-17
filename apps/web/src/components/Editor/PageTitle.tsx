import { createReactBlockSpec } from "@blocknote/react";
import './Pagetitle.css'

export const PageTitle = createReactBlockSpec(
  {
    type: "pageTitle",
    content: "inline",
    propSchema: {
        level: {
            default: 1,
            values:  [1, 2, 3],
        },
        backgroundColor: {
            default: "default",
        },
        textColor: {
            default: "default",
        },
        textAlignment: {
            default: "left",
            values: ["left", "center", "right", "justify"],
        },
    },
  },
  {
    render: (props) => {
      return (
        <h3
          className="heading"
          style={{
            textAlign: props.block.props.textAlignment,
            color: props.block.props.textColor,
          }}
        >
          <div
            className="inline-content"
            ref={props.contentRef}
            data-placeholder="Page Title"
            contentEditable
          />
        </h3>
      );
    },
  }
);
