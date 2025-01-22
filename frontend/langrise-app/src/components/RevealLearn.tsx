import React from 'react'
import { type Word } from './RevealWords'
import { type View } from '../App'
import LearnFlashcards from './learn_modes/LearnFlashcards.tsx'
import LearnMatch from './learn_modes/LearnMatch'
import LearnWriteWords from './learn_modes/LearnWriteWords'
import LearnStory from './learn_modes/LearnStory'
import { type Level } from './buttons/LearnButton.tsx'

type RevealLearnProps = {
  setView: React.Dispatch<React.SetStateAction<View>>
  view: View
  wordsToLearn: Word[]
  languageLevel?: Level
  tone?: string
}

export default function RevealLearn({ setView, view, wordsToLearn, languageLevel, tone }: RevealLearnProps) {
  let revealLearningMethod

  switch (view) {
    case 'learn_flashcards':
      revealLearningMethod = <LearnFlashcards words={wordsToLearn} />
      break
    case 'learn_match':
      revealLearningMethod = <LearnMatch words={wordsToLearn} />
      break
    case 'learn_write_words':
      revealLearningMethod = <LearnWriteWords words={wordsToLearn} />
      break
    case 'learn_story':
      revealLearningMethod = <LearnStory words={wordsToLearn} language_level={languageLevel ?? 'B1'}
                                         tone={tone ?? 'Neutral'} />
      break
    default:
      revealLearningMethod = <div>No learning method selected</div>
      break
  }

  return (
    <div>
      {revealLearningMethod}
      <button onClick={() => setView('words')}>Go Back</button>
    </div>
  )
}
