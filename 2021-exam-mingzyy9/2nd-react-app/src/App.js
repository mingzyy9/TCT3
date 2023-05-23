import './App.css';
import CssCard from './CssCard';
import CssInJsCard from './CssInJsCard';
import CssInJsCard2 from './CssInJsCard2';
import CssModuleCard from './CssModuleCard';
import InlineStyleCard from './InlineStyleCard';
import SassCard from './SassCard';


function App() {
  return (
    <div className="App">
      <InlineStyleCard title="Inline Style">Inline Style로 작성된 카드</InlineStyleCard>
      <CssCard title="CSS Style">CSS Style로 작성된 카드</CssCard>
      <SassCard title="Sass Style">Sass Style로 작성된 카드</SassCard>
      <CssModuleCard title="CSS Module Style">CSS Module로 작성된 카드</CssModuleCard>
      <CssInJsCard title="CSS in JS Style">CSS in JS로 작성된 카드</CssInJsCard>
      <CssInJsCard2 title="CSS in JS Style2">CSS in JS로 작성된 카드</CssInJsCard2>
    </div>
  );
}

export default App;
