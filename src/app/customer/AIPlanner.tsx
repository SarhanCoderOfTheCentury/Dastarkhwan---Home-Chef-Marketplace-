import { useState } from 'react'
import { BrainCircuit, Sparkles, Send, ShieldAlert } from 'lucide-react'
import { Button } from '../../components/ui/Button'

export default function AIPlanner() {
  const [goal, setGoal] = useState('weight-loss')
  const [diet, setDiet] = useState('none')
  const [inputVal, setInputVal] = useState('')
  const [messages, setMessages] = useState<Array<{ sender: 'user' | 'ai'; text: string }>>([
    {
      sender: 'ai',
      text: 'Assalamu Alaikum! I am your DastarKhwan AI Meal Planner. Select your diet goal and preferences above, or ask me to match you with nearby Karachi chef subscription packages.'
    }
  ])

  const handleSendMessage = () => {
    if (!inputVal.trim()) return
    
    const nextMessages: Array<{ sender: 'user' | 'ai'; text: string }> = [
      ...messages,
      { sender: 'user', text: inputVal }
    ]
    setMessages(nextMessages)
    setInputVal('')

    // Simulate AI thinking and response matching mock chefs
    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        {
          sender: 'ai',
          text: `Based on your request, I recommend looking at "The Healthy Plate" in Gulshan or "Sana's Gourmet Kitchen" in DHA Phase 6. They offer ${
            goal === 'weight-loss' ? 'low-carb Keto Cauliflower Biryani' : 'high-protein chicken karahi'
          } packages that match your goals. Would you like me to show their weekly schedules?`
        }
      ])
    }, 1000)
  }

  return (
    <div className="max-w-4xl mx-auto flex flex-col gap-6 py-4">
      {/* Title */}
      <div className="flex flex-col gap-1.5">
        <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-foreground-primary flex items-center gap-2">
          <BrainCircuit className="w-7 h-7 text-primary" /> AI Meal Planner
        </h1>
        <p className="text-xs sm:text-sm text-foreground-secondary">
          Configure personal health parameters and let AI build matching weekly plans from certified neighborhood kitchens.
        </p>
      </div>

      {/* Configuration Controls */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Setup Parameters */}
        <div className="md:col-span-1 bg-card border border-border/80 p-5 rounded-2xl flex flex-col gap-5 shadow-xs transition-colors duration-300">
          <h3 className="text-xs font-bold text-foreground-secondary uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-primary" /> Diet Parameters
          </h3>

          <div className="flex flex-col gap-4">
            {/* Goal Choice */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-foreground-secondary">Fitness Goal</label>
              <select 
                value={goal} 
                onChange={(e) => setGoal(e.target.value)}
                className="w-full bg-background-secondary border border-border rounded-lg p-2.5 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-primary text-foreground-primary"
              >
                <option value="weight-loss">Weight Loss / Low Carb</option>
                <option value="muscle-gain">Muscle Gain / High Protein</option>
                <option value="diabetic-care">Diabetic Care / Low Sugar</option>
                <option value="general-desi">Standard Home Desi Diet</option>
              </select>
            </div>

            {/* Diet restrictions */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-foreground-secondary">Dietary Restrictions</label>
              <select 
                value={diet} 
                onChange={(e) => setDiet(e.target.value)}
                className="w-full bg-background-secondary border border-border rounded-lg p-2.5 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-primary text-foreground-primary"
              >
                <option value="none">No Restrictions</option>
                <option value="vegetarian">Vegetarian (Sabzi / Daal)</option>
                <option value="gluten-free">Gluten Free</option>
                <option value="keto">Strict Keto / High Fat</option>
              </select>
            </div>

            <div className="bg-background-secondary/30 border border-border/50 rounded-xl p-3.5 flex gap-2 text-[10px] text-foreground-secondary leading-relaxed">
              <ShieldAlert className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
              <span>AI recommendations are matched dynamically against neighborhood cook declarations. Double-check ingredients if you have critical food allergies.</span>
            </div>
          </div>
        </div>

        {/* Chat / Planner Output */}
        <div className="md:col-span-2 border border-border/80 rounded-2xl flex flex-col h-[400px] overflow-hidden bg-card transition-colors duration-300">
          
          {/* Chat Messages */}
          <div className="flex-grow p-4 overflow-y-auto flex flex-col gap-3">
            {messages.map((msg, i) => (
              <div 
                key={i} 
                className={`flex gap-3 max-w-[85%] ${msg.sender === 'user' ? 'ml-auto flex-row-reverse' : ''}`}
              >
                <div className={`p-2.5 rounded-2xl text-xs leading-relaxed ${
                  msg.sender === 'user' 
                    ? 'bg-primary text-white rounded-tr-none' 
                    : 'bg-background-secondary text-foreground-primary rounded-tl-none border border-border/50'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {/* Input Chat Box */}
          <div className="p-3 border-t border-border/60 bg-background-secondary/20 flex gap-2 items-center">
            <input 
              type="text" 
              placeholder="Type your nutrition query or request chef matching..." 
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              className="flex-grow bg-card border border-border rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-primary placeholder:text-foreground-secondary"
            />
            <Button 
              variant="primary" 
              size="icon" 
              onClick={handleSendMessage}
              className="h-9 w-9 rounded-xl shrink-0"
              aria-label="Send message"
            >
              <Send className="w-3.5 h-3.5" />
            </Button>
          </div>

        </div>

      </div>

    </div>
  )
}
