import React from 'react';
import { VscClose, VscCloudDownload } from "react-icons/vsc";
import './ResumeModal.css'; // We will create this next

const ResumeModal = ({ isOpen, onClose, pdfUrl }) => {
    if (!isOpen) return null;

    return (
        <div className="resume-overlay" onClick={onClose}>
            <div className="resume-modal-content" onClick={(e) => e.stopPropagation()}>

                {/* Header with Actions */}
                <div className="resume-header">
                    <h3>Resume.pdf</h3>
                    <div className="resume-actions">
                        <a href={pdfUrl} download className="btn-icon">
                            <VscCloudDownload />
                        </a>
                        <button className="btn-icon close" onClick={onClose}>
                            <VscClose />
                        </button>
                    </div>
                </div>

                {/* PDF Viewer (Native Browser Frame) */}
                <div className="pdf-container">
                    <iframe
                        src={`${pdfUrl}#toolbar=0&navpanes=0&scrollbar=0`}
                        title="Resume"
                        width="100%"
                        height="100%"
                    />
                </div>
            </div>
        </div>
    );
};

export default ResumeModal;