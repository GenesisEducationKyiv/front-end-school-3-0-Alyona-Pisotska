import Select from 'react-select';

import type { SelectComponentProps } from '@/lib/types/types';

const FONT_SIZE = '0.875rem';

const AppSelect = <IsMulti extends boolean = false>({
  options,
  value,
  onChange,
  isMulti,
  placeholder = 'Select...',
  isDisabled = false,
}: SelectComponentProps<IsMulti>) => {
  return (
    <Select
      options={options}
      value={value}
      onChange={onChange}
      isMulti={isMulti}
      closeMenuOnSelect={!isMulti}
      hideSelectedOptions={false}
      placeholder={placeholder}
      isClearable={true}
      isDisabled={isDisabled}
      styles={{
        control: (baseStyles, state) => ({
          ...baseStyles,
          borderColor: state.isFocused ? 'var(--color-accent)' : 'var(--color-input)',
          outlineColor: state.isFocused ? 'var(--color-accent)' : undefined,
          outlineWidth: state.isFocused ? 3 : undefined,
          boxShadow: state.isFocused
            ? '0 0 0 calc(3px + 0px) color-mix(in oklab, var(--color-accent) 50%, transparent)'
            : undefined,
          fontSize: FONT_SIZE,
          '& svg': {
            cursor: 'pointer',
          },
        }),
        placeholder: (baseStyles) => ({
          ...baseStyles,
          color: 'var(--color-muted-foreground)',
          fontSize: FONT_SIZE,
        }),
        singleValue: (baseStyles) => ({
          ...baseStyles,
          fontSize: FONT_SIZE,
        }),
        multiValue: (baseStyles) => ({
          ...baseStyles,
          border: `1px solid var(--color-accent)`,
          borderRadius: 4,
          backgroundColor: 'white',
          fontSize: FONT_SIZE,
          '& > div': {
            fontSize: '100%',

            '&:hover': {
              backgroundColor: 'transparent',
              color: 'inherit',
            },
          },
        }),
        multiValueLabel: (baseStyles) => ({
          ...baseStyles,
          padding: 2,
        }),
        option: (baseStyles, state) => ({
          ...baseStyles,
          fontSize: FONT_SIZE,
          backgroundColor: state.isSelected ? 'color-mix(in oklab, var(--color-accent) 50%, transparent)' : 'inherit',
          '&:hover': {
            backgroundColor: 'color-mix(in oklab, var(--color-accent) 25%, transparent)',
          },
        }),
        input: (baseStyles) => ({
          ...baseStyles,
          fontSize: FONT_SIZE,
        }),
      }}
      theme={(theme) => ({
        ...theme,
        borderRadius: 8,
        colors: {
          ...theme.colors,
          primary: 'var(--color-accent)',
          primary75: 'color-mix(in oklab, var(--color-accent) 75%, transparent)',
          primary50: 'color-mix(in oklab, var(--color-accent) 50%, transparent)',
          primary25: 'color-mix(in oklab, var(--color-accent) 25%, transparent)',
        },
      })}
    />
  );
};

export { AppSelect as Select };
