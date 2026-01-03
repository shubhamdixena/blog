
import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { htmlToMarkdown } from './MarkdownConverter';

interface RichTextPreviewProps {
  value: string;
}

export const RichTextPreview = ({ value }: RichTextPreviewProps) => {
  return (
    <div className="p-6 min-h-[400px] prose prose-slate max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          code(props) {
            const { children, className, ...rest } = props;
            const match = /language-(\w+)/.exec(className || '');
            const isInline = !match;
            
            return isInline ? (
              <code className="bg-gray-100 px-1 py-0.5 rounded text-sm" {...rest}>
                {children}
              </code>
            ) : (
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                <code className={className} {...rest}>
                  {children}
                </code>
              </pre>
            );
          }
        }}
      >
        {htmlToMarkdown(value)}
      </ReactMarkdown>
    </div>
  );
};
