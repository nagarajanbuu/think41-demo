import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Upload, FileText } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const TextEditor = () => {
  const [content, setContent] = useState('Welcome to the Text Editor!\n\nClick here to start typing...\n\nFeatures:\n• Line numbers with synchronized scrolling\n• Current line highlighting\n• File upload support (.txt files)\n• Clean, modern interface\n\nTry uploading a text file to see it in action!');
  const [currentLine, setCurrentLine] = useState(1);
  const [fileName, setFileName] = useState('untitled.txt');
  
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const lineNumbersRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const { toast } = useToast();

  // Helper function to update line numbers
  const updateLineNumbers = (text: string) => {
    const lines = text.split('\n');
    return lines.length;
  };

  // Calculate line numbers for display
  const lines = content.split('\n');
  const lineCount = lines.length;

  // Milestone 1: Synchronized Scrolling for Line Numbers
  const handleScroll = () => {
    const textarea = textareaRef.current;
    const lineNumbers = lineNumbersRef.current;
    
    if (textarea && lineNumbers) {
      // Direct scroll synchronization as specified
      lineNumbers.scrollTop = textarea.scrollTop;
    }
  };

  // Milestone 2: Highlight Current Line
  const handleCursorPositionChange = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    // Calculate current line based on cursor position (selectionStart)
    const cursorPosition = textarea.selectionStart;
    const textBeforeCursor = content.substring(0, cursorPosition);
    const lineNumber = textBeforeCursor.split('\n').length;
    
    // Update current line state for highlighting
    setCurrentLine(lineNumber);
  };

  // Milestone 3: Load Document from File
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.name.endsWith('.txt')) {
      toast({
        title: 'Invalid file type',
        description: 'Please select a .txt file',
        variant: 'destructive',
      });
      return;
    }

    // Use FileReader to read file contents as text
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      
      // Set textarea value and update line numbers
      setContent(text);
      setFileName(file.name);
      setCurrentLine(1);
      
      // Update line numbers using helper function
      updateLineNumbers(text);
      
      toast({
        title: 'File loaded successfully',
        description: `${file.name} has been loaded into the editor`,
      });
    };
    
    reader.readAsText(file);
  };

  // Handle content changes
  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  // Set up event listeners
  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    // Add scroll event listener for synchronized scrolling
    textarea.addEventListener('scroll', handleScroll);
    
    // Add cursor position tracking for line highlighting
    textarea.addEventListener('keyup', handleCursorPositionChange);
    textarea.addEventListener('click', handleCursorPositionChange);
    textarea.addEventListener('input', handleCursorPositionChange);

    return () => {
      textarea.removeEventListener('scroll', handleScroll);
      textarea.removeEventListener('keyup', handleCursorPositionChange);
      textarea.removeEventListener('click', handleCursorPositionChange);
      textarea.removeEventListener('input', handleCursorPositionChange);
    };
  }, [content]);

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-6xl mx-auto space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="w-6 h-6 text-primary" />
            <h1 className="text-2xl font-bold">Text Editor</h1>
            <span className="text-sm text-muted-foreground">• {fileName}</span>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">
              Line {currentLine} of {lineCount}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => fileInputRef.current?.click()}
              className="gap-2"
            >
              <Upload className="w-4 h-4" />
              Load File
            </Button>
            {/* File input element as specified */}
            <input
              ref={fileInputRef}
              type="file"
              accept=".txt"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>
        </div>

        {/* Editor */}
        <Card className="overflow-hidden border-editor-border bg-editor">
          <div className="editor-container flex h-96">
            {/* Line Numbers div as specified */}
            <div
              ref={lineNumbersRef}
              className="flex-shrink-0 w-16 bg-editor border-r border-editor-border text-editor-line-numbers text-right pr-3 py-3 overflow-hidden editor-scrollbar"
              style={{ 
                scrollbarWidth: 'none', 
                msOverflowStyle: 'none',
                overflowY: 'auto'
              }}
            >
              {Array.from({ length: lineCount }, (_, i) => (
                <div
                  key={i + 1}
                  className={`leading-6 select-none px-2 ${
                    i + 1 === currentLine ? 'highlight-line' : ''
                  }`}
                >
                  {i + 1}
                </div>
              ))}
            </div>

            {/* Textarea for text input as specified */}
            <div className="flex-1 relative">
              <textarea
                ref={textareaRef}
                value={content}
                onChange={handleContentChange}
                className="w-full h-full resize-none bg-transparent text-editor-foreground p-3 focus:outline-none leading-6 editor-scrollbar"
                placeholder="Start typing here..."
                spellCheck={false}
                style={{
                  fontFamily: 'inherit',
                  fontSize: 'inherit',
                  lineHeight: 'inherit',
                }}
              />
            </div>
          </div>
        </Card>

        {/* Footer Info */}
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-4">
            <span>Characters: {content.length}</span>
            <span>Lines: {lineCount}</span>
            <span>Words: {content.trim() ? content.trim().split(/\s+/).length : 0}</span>
          </div>
          <div>
            Click "Load File" to upload .txt files • Current line highlighting enabled
          </div>
        </div>
      </div>
    </div>
  );
};

export default TextEditor;