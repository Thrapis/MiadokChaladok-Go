import cn from 'classnames';

import css from './RadioGroup.module.css';

type OptionType = {
    value: string
    title: string
}

type OptionProps = {
    type: 'checkbox' | 'radio'
    size?: 'small' | 'medium' | 'large'
    theme?: 'default' | 'button'
    className?: string

    value: OptionType["value"]
    title: OptionType["title"]
    selected: OptionType["value"]
    groupName: string
    onChange?: (value: string) => void
}

const Option = ({
    type = 'radio',
    size = 'medium',
    theme = 'default',
    className,
    value,
    title,
    selected,
    groupName,
    onChange
}: OptionProps) => {
    const handleChange = () => onChange?.(value);
    const isChecked = value === selected;

    return (
        <label
            className={cn(
                css.wrapper,
                css[`${theme}Theme`],
                css[`${size}Size`])
            }
            tabIndex={0}
        >
            <input
                className={cn(css.input)}
                onChange={handleChange}
                type={type}
                name={groupName}
                value={value}
                tabIndex={-1}
                checked={isChecked}
            />
            <span className={css.checkmark}></span>
            <span className={cn(css.label, className)}>
                {title}
            </span>
        </label>
    );
};

export type RadioGroupProps = {
    className?: string
    optionClassName?: string
    type: 'checkbox' | 'radio'
    size?: 'small' | 'medium' | 'large'
    theme?: 'default' | 'button'

    name: string
    options: OptionType[];
    selected: OptionType["value"];
    onChange?: (value: string) => void;
}

export const RadioGroup = ({
    className,
    optionClassName,
    type,
    size = 'medium',
    theme = 'default',
    name,
    options,
    selected,
    onChange,
}: RadioGroupProps) => {
    const handleChange = (value: string) => onChange?.(value);

    return (
        <div className={cn(css.group, className)}>
            {options.map(({ value, title }) => (
                <Option
                    type={type}
                    size={size}
                    theme={theme}
                    className={optionClassName}
                    key={crypto.randomUUID()}
                    groupName={name}
                    value={value}
                    title={title}
                    selected={selected}
                    onChange={handleChange}
                />
            ))}
        </div>
    );
}