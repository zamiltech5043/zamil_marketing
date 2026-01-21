
import React, { useState, useEffect } from 'react';
import { X, Loader2, CheckCircle2, ArrowRight } from 'lucide-react';
import { generateMarketingProposal } from '../services/geminiService';

interface ProposalModalProps {
  isOpen: boolean;
  onClose: () => void;
  websiteUrl: string;
}

export const ProposalModal: React.FC<ProposalModalProps> = ({ isOpen, onClose, websiteUrl }) => {
  const [loading, setLoading] = useState(false);
  const [proposal, setProposal] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen && websiteUrl) {
      handleGenerate();
    }
  }, [isOpen, websiteUrl]);

  const handleGenerate = async () => {
    setLoading(true);
    setProposal(null);
    try {
      const result = await generateMarketingProposal(websiteUrl);
      setProposal(result);
    } catch (err) {
      setProposal("Unable to generate proposal at this time. Our team will contact you directly.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative bg-[#0A0A0A] border border-white/10 w-full max-w-3xl rounded-sm overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <div>
            <h3 className="text-xl font-black uppercase tracking-tighter">Your Custom Growth Roadmap</h3>
            <p className="text-gray-400 text-sm">{websiteUrl}</p>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors">
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-grow overflow-y-auto p-8">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 space-y-6">
              <Loader2 className="animate-spin text-[#FFD54F]" size={48} />
              <div className="text-center">
                <p className="text-lg font-bold">Analyzing your digital presence...</p>
                <p className="text-gray-500 text-sm mt-1">Our AI is drafting a 3-step strategy for {websiteUrl}</p>
              </div>
            </div>
          ) : (
            <div className="space-y-8">
              <div className="bg-[#FFD54F]/5 border border-[#FFD54F]/20 p-6 rounded-sm">
                <div className="prose prose-invert max-w-none whitespace-pre-wrap font-light leading-relaxed text-gray-300">
                  {proposal}
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-white/5 p-4 rounded-sm border border-white/5">
                  <h4 className="font-bold flex items-center gap-2 mb-2">
                    <CheckCircle2 size={16} className="text-[#FFD54F]" />
                    Audit Complete
                  </h4>
                  <p className="text-xs text-gray-400">Website health and visibility factors assessed.</p>
                </div>
                <div className="bg-white/5 p-4 rounded-sm border border-white/5">
                  <h4 className="font-bold flex items-center gap-2 mb-2">
                    <CheckCircle2 size={16} className="text-[#FFD54F]" />
                    Competitor Data
                  </h4>
                  <p className="text-xs text-gray-400">Analysis of market gap and keyword opportunities.</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-white/10 bg-[#0F0F0F] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-400">Ready to execute this plan?</p>
          <button className="w-full sm:w-auto bg-[#FFD54F] hover:bg-[#ffe082] text-black font-black px-8 py-3 rounded-sm flex items-center justify-center gap-2 transition-all">
            Schedule Strategy Call <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};
