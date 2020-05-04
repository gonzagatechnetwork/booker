import {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  HTMLAttributes,
  InputHTMLAttributes,
  ChangeEvent,
  CSSProperties,
} from "react";
import Spinner from "./spinner";

export const H1 = (
  props: DetailedHTMLProps<
    HTMLAttributes<HTMLHeadingElement>,
    HTMLHeadingElement
  >
) => (
  <>
    <h1 {...props} />

    <style jsx>{`
      font-size: 48px;
      margin-top: 48px;
      font-weight: 700;
      text-decoration: none;
      border: none;
    `}</style>
  </>
);

export const Subtitle = (
  props: DetailedHTMLProps<
    HTMLAttributes<HTMLParagraphElement>,
    HTMLParagraphElement
  >
) => (
  <>
    <p {...props} />

    <style jsx>{`
      font-size: 18px;
      margin-top: 12px;
    `}</style>
  </>
);

export const TextInput = (
  props: DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >
) => {
  return (
    <>
      <input {...props} className={`input ${props.className || ""}`} />

      <style jsx>{`
        .input {
          border: 1px solid #89888e;
          border-radius: 4px;
          padding: 12px;
          width: 100%;
          color: #16103c;
          font-size: 1em;
        }

        .input::placeholder {
          color: #89888e;
          font-size: 14px;
        }

        .input:focus {
          outline: none;
          border: 1px solid #16103c;
          box-shadow: 0 0 5px #ededee;
        }
      `}</style>
    </>
  );
};

export const TextAreaInput = (
  props: DetailedHTMLProps<
    InputHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
  >
) => {
  return (
    <>
      <textarea {...props} className={`input ${props.className || ""}`} />

      <style jsx>{`
        .input {
          border: 1px solid #89888e;
          border-radius: 4px;
          padding: 12px;
          width: 100%;
          color: #16103c;
          font-size: 1em;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
          min-height: 128px;
        }

        .input::placeholder {
          color: #89888e;
          font-size: 14px;
        }

        .input:focus {
          outline: none;
          border: 1px solid #16103c;
          box-shadow: 0 0 5px #ededee;
        }
      `}</style>
    </>
  );
};

export const Button = (
  props: DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > & { loading?: boolean }
) => {
  return (
    <>
      {!props.loading && <button {...props} />}
      {props.loading && (
        <button {...props}>
          <Spinner color={"#fff"} />
        </button>
      )}

      <style jsx>{`
        button {
          border: none;
          padding-top: 12px;
          padding-bottom: 12px;
          padding-right: 24px;
          padding-left: 24px;
          background: #16103c;
          color: #ffffff;
          border-radius: 4px;
          text-decoration: none;
          font-size: 18px;
          font-weight: bold;
          cursor: pointer;
          transition: opacity 0.2s;
          box-sizing: border-box;
        }

        button:disabled {
          opacity: 0.2;
          cursor: default;
        }

        button:disabled:hover {
          opacity: 0.2;
          cursor: disabled;
        }

        button:hover {
          opacity: 0.9;
        }
      `}</style>
    </>
  );
};

export const Padding = (
  props: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>
) => {
  return (
    <>
      <div {...props} />

      <style jsx>{`
        padding: 24px;
      `}</style>
    </>
  );
};

export const Article = (
  props: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>
) => {
  return (
    <>
      <div {...props} />

      <style jsx>{`
        margin: 0 auto;
        max-width: 920px;
        margin-top: 24px;
      `}</style>
    </>
  );
};

export const Centered = (
  props: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>
) => {
  return (
    <>
      <div {...props} />

      <style jsx>{`
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
      `}</style>
    </>
  );
};

export const Section = (
  props: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>
) => {
  return (
    <>
      <div {...props} />

      <style jsx>{`
        margin-top: 48px;
      `}</style>
    </>
  );
};

// A L L  C A P S  W I T H
// S P A C E  B E T W E E N
// (also dimmed)
export const Capped = (
  props: DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>
) => {
  return (
    <>
      <span {...props} />

      <style jsx>{`
        color: #89888e;
        text-transform: uppercase;
        letter-spacing: 2px;
        font-size: 0.71875em;
        line-height: 1em;
      `}</style>
    </>
  );
};

export const TextField = (props: {
  title?: string;
  description?: string;
  hint?: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => any;
  placeholder?: string;
  disabled?: boolean;
  type?: string;
}) => {
  const {
    title,
    description,
    hint,
    value,
    onChange,
    placeholder,
    disabled,
    type,
  } = props;

  return (
    <div className="wrapper">
      {title && (
        <label className="title" htmlFor={title}>
          {title}
        </label>
      )}
      {description && (
        <label className="description" htmlFor={title}>
          {description}
        </label>
      )}
      <TextInput
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        disabled={disabled}
        id={title}
        type={type || "text"}
      />
      {hint && (
        <label className="hint" htmlFor={title}>
          {hint}
        </label>
      )}
      <style jsx>{`
        .wrapper {
          margin-bottom: 32px;
          display: flex;
          flex-direction: column;
        }
        .title,
        .description .hint {
          display: inline-block;
          width: 100%;
          font-weight: regular;
        }
        .title {
          font-weight: bold;
          padding-bottom: ${!!description ? "6px" : "12px"};
        }
        .description {
          padding-bottom: 12px;
          font-weight: normal;
          font-size: 14px;
        }
        .hint {
          padding-top: 6px;
          color: #89888e;
          font-size: 14px;
        }
      `}</style>
    </div>
  );
};

export const TextAreaField = (props: {
  title?: string;
  description?: string;
  hint?: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => any;
  placeholder?: string;
  disabled?: boolean;
  type?: string;
}) => {
  const {
    title,
    description,
    hint,
    value,
    onChange,
    placeholder,
    disabled,
    type,
  } = props;

  return (
    <div className="wrapper">
      {title && (
        <label className="title" htmlFor={title}>
          {title}
        </label>
      )}
      {description && (
        <label className="description" htmlFor={title}>
          {description}
        </label>
      )}
      <TextAreaInput
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        disabled={disabled}
        id={title}
        type={type || "text"}
      />
      {hint && (
        <label className="hint" htmlFor={title}>
          {hint}
        </label>
      )}
      <style jsx>{`
        .wrapper {
          margin-bottom: 32px;
          display: flex;
          flex-direction: column;
        }
        .title,
        .description .hint {
          display: inline-block;
          width: 100%;
          font-weight: regular;
        }
        .title {
          font-weight: bold;
          padding-bottom: ${!!description ? "6px" : "12px"};
        }
        .description {
          padding-bottom: 12px;
          font-weight: normal;
          font-size: 14px;
        }
        .hint {
          padding-top: 6px;
          color: #89888e;
          font-size: 14px;
        }
      `}</style>
    </div>
  );
};

export const Well = ({
  children,
  style,
}: {
  children;
  style?: CSSProperties;
}) => {
  return (
    <div className="behind" style={style}>
      {children}
      <style jsx>{`
        .behind {
          background: #f4f3fc;
          padding: 24px;
          border-radius: 8px;
        }
      `}</style>
    </div>
  );
};

import React, { useEffect, useState } from "react";

export const FadeIn = ({
  children,
  show,
  style,
  className,
  delay,
}: {
  show?: boolean;
  children: any;
  style?: any;
  className?: string;
  delay?: number;
}) => {
  let internalShowing = show === undefined ? true : show;

  const [opacity, setOpacity] = useState(0.0);
  useEffect(() => {
    setTimeout(() => {
      if (internalShowing) {
        setOpacity(1.0);
      } else {
        setOpacity(0.0);
      }
    }, delay || 0);
  }, [show]); // since FadeIn needs to recompute each time. // otherwise you'll cause an incredibly painful performance problem // VERY IMPORTANT, use "show" not "internalShowing" //

  return (
    <div className={`fade-in ${className || ""}`} style={style}>
      {children}
      <style jsx>{`
        .fade-in {
          opacity: ${opacity};
          transition: opacity 0.25s;
          height: 100%;
        }
      `}</style>
    </div>
  );
};
