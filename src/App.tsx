import React, {useState} from 'react'
import MonacoEditor, {monaco} from "react-monaco-editor";

interface Widget {
    settings: Setting[],
    code: string
}

const WidgetEditor: React.FC = () => {

    const [widget, setWidget] = useState<Widget>({settings: ['b'], code: ''})

    return <div>
        <h2>Widget</h2>
        <pre style={{minHeight: 200}}>{JSON.stringify(widget, null, 2)}</pre>
        <Settings
            settings={widget.settings}
            onChange={(settings) => setWidget({...widget, settings})}
        />

        <TextEditor
            value={widget.code}
            onChange={code => setWidget({...widget, code})}
        />

        <CodeEditor
            value={widget.code}
            onChange={code => setWidget({...widget, code})}
        />
    </div>
}

type Setting = 'a' | 'b'

interface SettingsProps {
    settings: Setting[]
    onChange: (settings: Setting[]) => void
}

const Settings: React.FC<SettingsProps> = ({settings, onChange}) => {
    return <div>
        <h2>Checkboxes</h2>
        {['a', 'b'].map((s) => {
            return <div key={s}>
                <input id={s} type={'checkbox'} name={s} value={s} checked={settings.includes(s)}
                       onChange={() => onChange(settings.includes(s) ? settings.filter(c => s !== c) : [...settings, s])}
                />
                <label htmlFor={s}>{s}</label>
            </div>

        })}
    </div>
}

interface TextEditorProps {
    value: string
    onChange: (value: string) => void
}

const TextEditor: React.FC<TextEditorProps> = ({value, onChange}) => {
    return <div>
        <h2>Text</h2>
        <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className={"w-full h-64"}
        />

    </div>
}

const CodeEditor: React.FC<TextEditorProps> = ({value, onChange}) => {
    return <div>
        <h2>Monaco</h2>
        <MonacoEditor
            height={200}
            value={value}
            onChange={onChange}
        />
    </div>
}

function App() {
    return (
        <WidgetEditor/>
    )
}

export default App
