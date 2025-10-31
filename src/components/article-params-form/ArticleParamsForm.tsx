import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Text } from 'src/ui/text';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import clsx from 'clsx';

import styles from './ArticleParamsForm.module.scss';
import { useRef, useState, useEffect  } from 'react';
import {fontFamilyOptions, ArticleStateType, OptionType, fontColors, fontSizeOptions, backgroundColors, contentWidthArr, defaultArticleState} from '../../constants/articleProps'

type ArticleParamsFormProps = {
	currentArticleState: ArticleStateType;
	setCurrentArticleState: (param: ArticleStateType) => void;
};

export const ArticleParamsForm = ({currentArticleState, setCurrentArticleState}: ArticleParamsFormProps) => {
	const [isFormOpen, setIsFormOpen] = useState(false);
	const asideRef = useRef<HTMLDivElement | null>(null);
	const [choosenArticleParams, setChoosenArticleParams] = useState<ArticleStateType>(currentArticleState)

	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
		  if (asideRef.current && !asideRef.current.contains(event.target as Node)) {
			setIsFormOpen(false);
		  }
		}
		if (isFormOpen) {
		  document.addEventListener('mousedown', handleClickOutside);
		}
		return () => {
		  document.removeEventListener('mousedown', handleClickOutside);
		};
	  }, [isFormOpen]);

    function handleOpen() {
		setIsFormOpen((prev) => !prev);
    }

	function handleChange(key: keyof ArticleStateType, value: OptionType) {
		setChoosenArticleParams({...choosenArticleParams, [key]: value})
	}

	function handleReset(e: React.FormEvent) {
		e.preventDefault();
		setChoosenArticleParams(defaultArticleState);
		setCurrentArticleState(defaultArticleState)
	}

	function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		setCurrentArticleState(choosenArticleParams)
	}



	return (
		<>
			<ArrowButton isOpen={isFormOpen} onClick={handleOpen} />
			<aside ref={asideRef} className={clsx(styles.container, isFormOpen && styles.container_open)}>
				<form className={styles.form} onReset={handleReset} onSubmit={handleSubmit}>

				    <Text size={31} uppercase={true} weight={800}>
						Задайте параметры
					</Text>

					<Select selected={choosenArticleParams.fontFamilyOption}
					options={fontFamilyOptions}
					title={'Шрифт'}
					onChange={(option) => handleChange("fontFamilyOption", option)}/>

                    <RadioGroup
						selected={choosenArticleParams.fontSizeOption}
						options={fontSizeOptions}
						onChange={(option) => handleChange('fontSizeOption', option)}
						name='Размер шрифта'
						title='Размер шрифта'
					/>
					<Select
						selected={choosenArticleParams.fontColor}
						options={fontColors}
						onChange={(option) => handleChange('fontColor', option)}
						title='Цвет шрифта'
					/>
					<Separator />
					<Select
						selected={choosenArticleParams.backgroundColor}
						options={backgroundColors}
						onChange={(option) => handleChange('backgroundColor', option)}
						title='Цвет фона'
					/>
					<Select
						selected={choosenArticleParams.contentWidth}
						options={contentWidthArr}
						onChange={(option) => handleChange('contentWidth', option)}
						title='Ширина контента'
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
