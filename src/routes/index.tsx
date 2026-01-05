import * as Solid from 'solid-js'
import { createFileRoute } from '@tanstack/solid-router'
import Deck from '../lib/Deck'

export const Route = createFileRoute('/')({
  component: IndexComponent,
})

function IndexComponent() {
  const deck = new Deck()  
  const [currentCard, setCurrentCard] = Solid.createSignal<ReturnType<typeof deck.draw>>(undefined)
  const [count, setCount] = Solid.createSignal(deck.count)
  const [cards, setCards] = Solid.createSignal(deck.cards)

  const handleDraw = () => {
    const card = deck.draw()
    setCurrentCard(card)
    setCount(deck.count)
    setCards(deck.cards)
  }

  const handleShuffle = () => {
    deck.shuffle()
    setCurrentCard(undefined)
    setCount(deck.count)
    setCards(deck.cards)
  }

  const handleReset = () => {
    deck.reset()
    deck.shuffle() // Usually reset means full deck, shuffling it makes sense if we want random order again.
    setCurrentCard(undefined)
    setCount(deck.count)
    setCards(deck.cards)
  }

  return (
    <div class="text-center">
      <header class="min-h-screen flex flex-col items-center justify-center bg-[#282c34] text-white py-10">
        <h1 class="text-4xl mb-8">Solid Deck</h1>
        
        <div class="mb-8 h-48 flex items-center justify-center">
          {currentCard() ? (
            <div class="bg-white text-black rounded-lg p-8 text-6xl w-32 h-48 flex items-center justify-center border-4 border-gray-300 shadow-xl">
               <span class={['Diamonds', 'Hearts'].includes(currentCard()!.suit) ? 'text-red-600' : 'text-black'}>
                 {currentCard()!.display}
               </span>
            </div>
          ) : (
             <div class="border-4 border-dashed border-gray-500 rounded-lg w-32 h-48 flex items-center justify-center text-gray-500">
               No Card
             </div>
          )}
        </div>

        <div class="text-xl mb-4">
          Cards Remaining: {count()}
        </div>

        <div class="flex gap-4 mb-12">
          <button 
            onClick={handleDraw}
            disabled={count() === 0}
            class="px-6 py-2 bg-[#61dafb] text-black font-bold rounded hover:bg-[#4fa8d1] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Draw Card
          </button>
          
          <button 
            onClick={handleShuffle}
             class="px-6 py-2 bg-purple-500 text-white font-bold rounded hover:bg-purple-600 transition-colors"
          >
            Shuffle
          </button>

          <button 
            onClick={handleReset}
             class="px-6 py-2 bg-red-500 text-white font-bold rounded hover:bg-red-600 transition-colors"
          >
            Reset
          </button>
        </div>

        <div class="w-full max-w-4xl px-4">
            <h2 class="text-2xl mb-4">Deck Contents</h2>
            <div class="flex flex-wrap gap-2 justify-center">
                <Solid.For each={cards()}>
                    {(card) => (
                        <div class="bg-white text-black rounded w-12 h-16 flex items-center justify-center text-lg shadow">
                             <span class={['Diamonds', 'Hearts'].includes(card.suit) ? 'text-red-600' : 'text-black'}>
                                {card.display}
                             </span>
                        </div>
                    )}
                </Solid.For>
            </div>
        </div>
      </header>
    </div>
  )
}
