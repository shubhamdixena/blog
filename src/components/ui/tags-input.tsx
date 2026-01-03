import React, { useState, useRef, useEffect, useMemo, useCallback, memo } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { X, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Tag {
  id: string;
  name: string;
  color?: string;
}

interface TagsInputProps {
  selectedTags: Tag[];
  availableTags: Tag[];
  onTagsChange: (tags: Tag[]) => void;
  onCreateTag?: (name: string) => Promise<Tag | null>;
  placeholder?: string;
  className?: string;
}

const TagsInputComponent = ({
  selectedTags,
  availableTags,
  onTagsChange,
  onCreateTag,
  placeholder = "Add tags...",
  className
}: TagsInputProps) => {
  const [inputValue, setInputValue] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const filteredTags = useMemo(() => {
    const q = inputValue.toLowerCase();
    const selectedIds = new Set(selectedTags.map(t => t.id));
    return availableTags.filter(tag =>
      tag.name.toLowerCase().includes(q) && !selectedIds.has(tag.id)
    );
  }, [availableTags, inputValue, selectedTags]);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setIsOpen(true);
    setHighlightedIndex(-1);
  }, []);

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (highlightedIndex >= 0 && filteredTags[highlightedIndex]) {
        selectTag(filteredTags[highlightedIndex]);
      } else if (inputValue.trim() && onCreateTag) {
        handleCreateTag();
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlightedIndex(prev => 
        prev < filteredTags.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightedIndex(prev => prev > 0 ? prev - 1 : -1);
    } else if (e.key === 'Escape') {
      setIsOpen(false);
      setHighlightedIndex(-1);
    } else if (e.key === 'Backspace' && !inputValue && selectedTags.length > 0) {
      removeTag(selectedTags[selectedTags.length - 1].id);
    }
  };

  const selectTag = useCallback((tag: Tag) => {
    onTagsChange([...selectedTags, tag]);
    setInputValue('');
    setIsOpen(false);
    setHighlightedIndex(-1);
    inputRef.current?.focus();
  }, [onTagsChange, selectedTags]);

  const removeTag = useCallback((tagId: string) => {
    onTagsChange(selectedTags.filter(tag => tag.id !== tagId));
  }, [onTagsChange, selectedTags]);

  const handleCreateTag = useCallback(async () => {
    if (!onCreateTag || !inputValue.trim()) return;
    
    try {
      const newTag = await onCreateTag(inputValue.trim());
      if (newTag) {
        onTagsChange([...selectedTags, newTag]);
        setInputValue('');
        setIsOpen(false);
      }
    } catch (error) {
      console.error('Failed to create tag:', error);
    }
  }, [inputValue, onCreateTag, onTagsChange, selectedTags]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={cn("relative", className)} ref={dropdownRef}>
      <div className="flex flex-wrap gap-1 p-1 border border-input rounded-md bg-background min-h-[32px] focus-within:ring-1 focus-within:ring-ring">
        {selectedTags.map((tag) => (
          <Badge
            key={tag.id}
            variant="secondary"
            className="flex items-center gap-1 text-[11px] h-6"
            style={{
              backgroundColor: tag.color ? `${tag.color}20` : undefined,
              borderColor: tag.color || undefined,
              color: tag.color || undefined
            }}
          >
            {tag.name}
            <Button
              variant="ghost"
              size="sm"
              className="h-4 w-4 p-0 hover:bg-transparent"
              onClick={() => removeTag(tag.id)}
            >
              <X className="h-3 w-3" />
            </Button>
          </Badge>
        ))}
        <Input
          ref={inputRef}
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleInputKeyDown}
          onFocus={() => setIsOpen(true)}
          placeholder={selectedTags.length === 0 ? placeholder : ""}
          className="flex-1 border-0 bg-transparent p-0 text-[13px] focus-visible:ring-0 min-w-[120px] h-6"
        />
      </div>

      {isOpen && (filteredTags.length > 0 || (inputValue.trim() && onCreateTag)) && (
        <div className="absolute z-10 w-full mt-1 bg-popover border border-border rounded-md shadow-lg max-h-40 overflow-y-auto">
          {filteredTags.map((tag, index) => (
            <div
              key={tag.id}
              className={cn(
                "px-2 py-1.5 cursor-pointer text-[13px] hover:bg-accent flex items-center gap-2",
                index === highlightedIndex && "bg-accent"
              )}
              onClick={() => selectTag(tag)}
            >
              <div
                className="w-3 h-3 rounded-full border"
                style={{ backgroundColor: tag.color || '#6B7280' }}
              />
              {tag.name}
            </div>
          ))}
          {inputValue.trim() && onCreateTag && !filteredTags.find(tag => 
            tag.name.toLowerCase() === inputValue.toLowerCase()
          ) && (
            <div
              className={cn(
                "px-2 py-1.5 cursor-pointer text-[13px] hover:bg-accent flex items-center gap-2 border-t",
                highlightedIndex === filteredTags.length && "bg-accent"
              )}
              onClick={handleCreateTag}
            >
              <Plus className="w-3 h-3" />
              Create "{inputValue}"
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export const TagsInput = memo(TagsInputComponent);
