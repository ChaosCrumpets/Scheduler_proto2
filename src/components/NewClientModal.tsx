import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { X } from 'lucide-react';
import { useCreateClient } from '../hooks/api';

interface NewClientModalProps {
    isOpen: boolean;
    onClose: () => void;
    onClientCreated: () => void;
}

const clientSchema = z.object({
    name: z.string().min(1, 'Full Name is required.'),
    email: z.string().email('Invalid email address.'),
    phone: z.string().optional(),
    gender: z.string().optional(),
});

type NewClientFormData = z.infer<typeof clientSchema>;

const NewClientModal = ({ isOpen, onClose, onClientCreated }: NewClientModalProps) => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm<NewClientFormData>({
        resolver: zodResolver(clientSchema),
    });

    const createClient = useCreateClient();

    const onSubmit = (data: NewClientFormData) => {
        createClient.mutate(data, {
            onSuccess: () => {
                onClientCreated();
                reset();
            }
        });
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4">
            <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md relative">
                <button onClick={onClose} className="absolute top-3 right-3 text-onyx/50 hover:text-onyx"><X size={24} /></button>
                <h2 className="text-2xl font-bold mb-4 text-onyx">New Client</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-onyx/80">Full Name <span className="text-indian-red">*</span></label>
                        <input {...register('name')} className="mt-1 block w-full p-2 border border-onyx/20 rounded-md bg-seashell-700" />
                        {errors.name && <p className="text-indian-red text-xs mt-1">{errors.name.message}</p>}
                    </div>
                     <div>
                        <label className="block text-sm font-medium text-onyx/80">Email <span className="text-indian-red">*</span></label>
                        <input {...register('email')} className="mt-1 block w-full p-2 border border-onyx/20 rounded-md bg-seashell-700" />
                        {errors.email && <p className="text-indian-red text-xs mt-1">{errors.email.message}</p>}
                    </div>
                     <div>
                        <label className="block text-sm font-medium text-onyx/80">Phone Number</label>
                        <input {...register('phone')} className="mt-1 block w-full p-2 border border-onyx/20 rounded-md bg-seashell-700" />
                    </div>
                     <div>
                        <label className="block text-sm font-medium text-onyx/80">Gender</label>
                        <input {...register('gender')} className="mt-1 block w-full p-2 border border-onyx/20 rounded-md bg-seashell-700" />
                    </div>
                    <div className="pt-4 flex justify-end gap-2">
                         <button type="button" onClick={onClose} className="bg-onyx/10 text-onyx px-4 py-2 rounded-md hover:bg-onyx/20">Cancel</button>
                         <button type="submit" className="bg-indian-red text-white px-4 py-2 rounded-md hover:bg-indian-red/90">Save Client</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default NewClientModal;
