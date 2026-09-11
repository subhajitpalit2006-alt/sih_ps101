import { useEffect, useState } from 'react'
import { FileText, ShieldCheck, Sparkles, UploadCloud, X } from 'lucide-react'
import { assessmentStages } from '../data/mock'
import { AssessmentHelp, AssessmentProcessing, FormField, GeneratedAssessment } from '../components/parts'

export function AssessmentEngine() {
  const [fileName, setFileName] = useState('')
  const [questionCount, setQuestionCount] = useState('10')
  const [difficulty, setDifficulty] = useState('Mixed difficulty')
  const [quizType, setQuizType] = useState('MCQ · Single correct answer')
  const [status, setStatus] = useState<'setup' | 'generating' | 'generated'>('setup')
  const [stage, setStage] = useState(0)
  const [started, setStarted] = useState(false)

  useEffect(() => {
    if (status !== 'generating') return
    const timer = window.setInterval(() => setStage((current) => Math.min(current + 1, assessmentStages.length - 1)), 900)
    const complete = window.setTimeout(() => setStatus('generated'), 3900)
    return () => { window.clearInterval(timer); window.clearTimeout(complete) }
  }, [status])

  const generateAssessment = () => { setStage(0); setStarted(false); setStatus('generating') }
  if (status === 'generating') return <AssessmentProcessing stage={stage} fileName={fileName} />
  if (status === 'generated') return <GeneratedAssessment fileName={fileName} questionCount={questionCount} difficulty={difficulty} onStart={() => setStarted(true)} started={started} onBack={() => setStatus('setup')} />

  return <div className="page-container assessment-page"><div className="assessment-heading"><div><p className="eyebrow">Learning tools · AI assessment engine</p><h1>Generate an assessment</h1><p className="heading-copy">Turn approved training material into a structured knowledge check for official-statistics teams.</p></div><span className="privacy-note"><ShieldCheck size={14} /> Mock generation · no files uploaded</span></div><div className="assessment-layout"><section className="panel assessment-setup-panel"><div className="panel-header"><div><p className="eyebrow">Step 1 of 2</p><h2>Assessment setup</h2></div><span className="form-required">All fields required</span></div><p className="panel-description">Upload a reference document, choose the assessment format, and generate a question set for review.</p><label className="upload-zone" htmlFor="assessment-file"><input id="assessment-file" type="file" accept=".pdf,.ppt,.pptx,.doc,.docx" onChange={(event) => setFileName(event.target.files?.[0]?.name ?? '')} /><span className="upload-icon"><UploadCloud size={23} /></span><strong>{fileName || 'Upload reference material'}</strong><span>{fileName ? 'Document ready for mock processing' : 'PDF, PowerPoint or Word document · max 25 MB'}</span><small>PDF, PowerPoint or Word document</small></label><div className="upload-sample">or <button type="button" className="text-button" onClick={() => setFileName('NSSTA_Sampling_Methods_Module_2.pdf')}>use sample training material</button></div><div className="selected-file">{fileName ? <><FileText size={16} /><div><strong>{fileName}</strong><span>Ready · 2.4 MB · Training material</span></div><button className="icon-button" aria-label="Remove document" onClick={() => setFileName('')}><X size={15} /></button></> : <><FileText size={16} /><span>No material selected</span></>}</div><div className="assessment-fields"><FormField label="Number of questions"><select className="text-input" value={questionCount} onChange={(event) => setQuestionCount(event.target.value)}><option>5</option><option>10</option><option>15</option><option>20</option></select></FormField><FormField label="Difficulty"><select className="text-input" value={difficulty} onChange={(event) => setDifficulty(event.target.value)}><option>Foundation</option><option>Intermediate</option><option>Advanced</option><option>Mixed difficulty</option></select></FormField><FormField label="Question type" wide><select className="text-input" value={quizType} onChange={(event) => setQuizType(event.target.value)}><option>MCQ · Single correct answer</option><option>Quiz · Multiple correct answers</option><option>Knowledge check · Mixed format</option></select></FormField></div><div className="form-actions"><span><span className={`status-dot ${fileName ? '' : 'status-dot-muted'}`}></span>{fileName ? 'Material ready' : 'Upload material to continue'}</span><button className="button button-primary" disabled={!fileName} onClick={generateAssessment}>Generate assessment <Sparkles size={16} /></button></div></section><aside className="panel assessment-help-panel"><div className="analysis-aside-icon"><Sparkles size={19} /></div><h2>How it works</h2><p>The engine creates a draft question set for review before it is assigned to learners.</p><AssessmentHelp number="01" title="Read and understand" detail="Identifies the document's learning objectives and key sections." /><AssessmentHelp number="02" title="Create and validate" detail="Generates questions, checks answer quality and removes ambiguity." /><AssessmentHelp number="03" title="Review before use" detail="You remain in control of the final assessment shared with officers." /><div className="assessment-help-footer"><ShieldCheck size={15} /><span>Generated content should be verified by a subject matter expert.</span></div></aside></div></div>
}
