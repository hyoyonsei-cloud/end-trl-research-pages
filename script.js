const models = {
  s1: { kicker:'BEST TEXT + METADATA MODEL', value:'78.98', unit:'%', label:'개발 OOF 정확도', note:'Head–Tail 입력과 SciBERT, 메타데이터를 결합한 S1은 내부 입력 조건 중 가장 높은 Macro-F1을 기록했습니다.', macro:'0.7045', macroBar:'70.45%', recall:'55.37%', recallBar:'55.37%', scope:'개발 OOF', scopeNote:'고정 group 기반 5-fold · n=9,632' },
  hgb:{ kicker:'METADATA-ONLY MODEL', value:'81.65', unit:'%', label:'개발 OOF 정확도', note:'메타데이터 HGB는 전체 정확도가 높았지만 High recall은 38.89%로 낮아, 다수 클래스 성능과 희소 클래스 탐지의 차이를 보여줍니다.', macro:'—', macroBar:'0%', recall:'38.89%', recallBar:'38.89%', scope:'개발 OOF', scopeNote:'텍스트 없이 구조화 메타데이터 사용' },
  mix:{ kicker:'FIXED PROBABILITY MIXTURE', value:'0.7191', unit:'', label:'개발 OOF Macro-F1', note:'S1과 HGB 확률을 0.5씩 평균한 고정 혼합은 서로 다른 오류 특성을 결합해 개발 Macro-F1을 높였습니다.', macro:'0.7191', macroBar:'71.91%', recall:'모델 절충', recallBar:'64%', scope:'개발 OOF', scopeNote:'0.5 × S1 + 0.5 × HGB' }
};
const ids=['model-kicker','metric-value','metric-unit','metric-label','metric-note','macro-value','recall-value','scope-value','scope-note'];
document.querySelectorAll('[data-model]').forEach(button=>button.addEventListener('click',()=>{
  const data=models[button.dataset.model];
  document.querySelectorAll('[data-model]').forEach(b=>{b.classList.toggle('active',b===button);b.setAttribute('aria-selected',String(b===button))});
  const values=[data.kicker,data.value,data.unit,data.label,data.note,data.macro,data.recall,data.scope,data.scopeNote];
  ids.forEach((id,i)=>document.getElementById(id).textContent=values[i]);
  document.getElementById('macro-bar').style.width=data.macroBar;
  document.getElementById('recall-bar').style.width=data.recallBar;
}));
const chartObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting)entry.target.classList.add('is-visible')}),{threshold:.25});
document.querySelectorAll('.chart-row').forEach(row=>chartObserver.observe(row));
