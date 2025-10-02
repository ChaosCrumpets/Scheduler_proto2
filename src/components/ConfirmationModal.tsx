import { X } from 'lucide-react';

const ConfirmationModal = ({ isOpen, onClose, onConfirm, title, message }) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
            <div className="bg-white rounded-lg shadow-lg">
                 <div className="flex justify-between items-center p-4 border-b border-onyx/10">
                    <h3 className="text-lg font-bold text-onyx">{title}</h3>
                    <button onClick={onClose} className="text-onyx/50 hover:text-onyx"><X size={24} /></button>
                </div>
                <div className="p-6">
                    <p className="text-onyx/80 mb-6">{message}</p>
                    <div className="flex justify-end gap-4">
                        <button onClick={onClose} className="px-4 py-2 rounded-md bg-onyx/10 text-onyx font-semibold">No</button>
                        <button onClick={onConfirm} className="px-4 py-2 rounded-md bg-indian-red text-white font-semibold">Yes</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;
