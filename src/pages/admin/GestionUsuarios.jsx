import React, { useEffect, useState, useCallback } from "react"; // useCallback added
import { manejarObtenerUsuarios, manejarActualizarUsuario } from "../../controllers/userController"; // Ensure paths are correct
import { traducirRol } from "../../helpers/traducirRol"; // Ensure path is correct
import { toast } from "react-toastify";
import {
    FaUserEdit,
    FaSave,
    FaTimesCircle, // Icon for Cancel
    FaUserCircle,
    FaBriefcase,
    FaCheckCircle, // Updated Icon for Active
    FaMinusCircle, // Updated Icon for Inactive
    FaSpinner,     // Icon for Loading
    FaExclamationTriangle // Icon for Error
} from "react-icons/fa";
import { RiMailFill } from "react-icons/ri"; // Icon for email

// Consistent Role Definitions (similar to NuevoUsuario)
const roleOptions = [
    { value: "USER_ROLE", label: "Usuario" }, // Added default User Role if applicable
    { value: "ADMIN_ROLE", label: "Administrador" },
    { value: "ENCARGADOFRAY_ROLE", label: "Encargado Fray" },
    { value: "ENCARGADOGALINDEZ_ROLE", label: "Encargado Galindez" },
    { value: "ENCARGADOINMOBILIARIA_ROLE", label: "Encargado Inmob." }, // Slightly shorter label
];

// Helper to find label for a role value
const getRoleLabel = (value) => {
    const role = roleOptions.find(r => r.value === value);
    return role ? role.label : value; // Fallback to value if not found
}


export const GestionUsuarios = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(true); // Loading state
    const [editandoId, setEditandoId] = useState(null);
    const [valoresEditados, setValoresEditados] = useState({});
    const [isSaving, setIsSaving] = useState(false); // Saving state for button

    // Fetch users function using useCallback to potentially memoize
    const fetchUsers = useCallback(async () => {
        setIsLoading(true);
        setError(""); // Clear previous errors on refetch
        try {
            await manejarObtenerUsuarios({ setUsuarios, setError });
        } catch (fetchError) {
            // If manejarObtenerUsuarios doesn't set the error state on throw
            setError("Error al cargar los usuarios. Intente de nuevo.");
            console.error("Fetch User Error:", fetchError);
            setUsuarios([]); // Clear potentially stale user data
        } finally {
             setIsLoading(false);
        }
    }, []); // Dependencies: empty means it's created once

    // Initial fetch
    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]); // Depend on fetchUsers

    // Start editing
    const comenzarEdicion = (usuario) => {
        setEditandoId(usuario._id);
        // Assuming only one role is managed here for simplicity, take the first one
        // If multiple roles need management, this UI needs significant changes
        setValoresEditados({
            nombre: usuario.nombre,
            email: usuario.email,
            estado: usuario.estado, // Keep as boolean
            roles: usuario.roles[0] || '', // Handle case where roles array might be empty
        });
    };

    // Cancel editing
    const cancelarEdicion = () => {
        setEditandoId(null);
        setValoresEditados({}); // Clear edited values
    };

    // Save changes
    const guardarCambios = async (id) => {
        if (isSaving) return;
        setIsSaving(true);
        setError(""); // Clear previous errors

        // Ensure roles is an array before sending if backend expects it
        const datosParaGuardar = {
            ...valoresEditados,
            roles: [valoresEditados.roles] // Send as an array with one role
            // 'estado' should already be a boolean from the select handler if done right
        };

        // Debug: Check data being sent
        // console.log("Saving Data:", datosParaGuardar);

        await manejarActualizarUsuario({
            id,
            datosActualizados: datosParaGuardar,
            setError, // Pass setError to the controller
            toast,    // Pass toast for notifications
            toggleRecargar: fetchUsers, // Use fetchUsers to reload data
        });

        setEditandoId(null); // Exit editing mode regardless of success/fail (controller handles notification)
        setIsSaving(false);
    };

    // Unified input handler for text inputs and selects
    const handleInputChange = (e) => {
        const { name, value, type } = e.target;

        setValoresEditados(prev => ({
            ...prev,
            // Convert 'estado' value from string ('true'/'false') to boolean
            [name]: name === 'estado' ? (value === 'true') : value
        }));
    };

    // --- Render Logic ---

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center p-6 text-white">
                <FaSpinner className="animate-spin text-4xl text-primary" />
                <span className="ml-3 text-xl">Cargando Usuarios...</span>
            </div>
        );
    }

    return (
        <div className="min-h-screen  text-gray-300">
            <h2 className="text-3xl font-bold text-center text-white mb-10 uppercase tracking-wider">
                Gestión de <span className="text-primary">Usuarios</span>
            </h2>

            {/* General Error Display */}
            {error && !error.includes("actualizar") && ( // Show fetch errors prominently
                <div className="max-w-3xl mx-auto bg-red-500/90 border border-red-400 text-white text-center text-sm px-4 py-3 mb-6 rounded shadow-md flex items-center justify-center gap-2">
                   <FaExclamationTriangle/> {error}
                </div>
            )}

             {/* Grid for User Cards */}
            <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
                {usuarios.length === 0 && !isLoading && !error && (
                     <p className="text-center text-gray-400 col-span-full">No se encontraron usuarios.</p>
                 )}

                {usuarios.map((usuario) => {
                    const isEditingCurrentUser = editandoId === usuario._id;

                    return (
                        <div
                            key={usuario._id}
                            className={`relative bg-secondary-900 border border-secondary-700 shadow-xl rounded-lg overflow-hidden transition duration-300 ease-in-out hover:shadow-2xl hover:border-primary/50 flex flex-col ${isEditingCurrentUser ? 'ring-2 ring-offset-2 ring-offset-secondary-900 ring-primary' : ''}`}
                        >
                            {/* Edit Indicator */}
                            {isEditingCurrentUser && (
                                <span className="absolute top-2 right-2 bg-primary text-black text-xs font-bold px-2 py-0.5 rounded z-10">Editando</span>
                            )}

                            {/* Card Body */}
                            <div className="p-5 flex-grow"> {/* Use flex-grow to push actions down */}
                                <div className="flex flex-col items-center mb-4">
                                    {/* Avatar */}
                                    <div className={`mb-3 w-24 h-24 rounded-full flex items-center justify-center text-white text-4xl border-2 ${isEditingCurrentUser ? 'border-primary bg-gray-700' : (usuario.estado ? 'border-green-500 bg-secondary-100' : 'border-gray-500 bg-gray-700')}`}>
                                        <FaUserCircle />
                                    </div>

                                    {/* Nombre */}
                                    {isEditingCurrentUser ? (
                                        <input
                                            type="text"
                                            name="nombre"
                                            value={valoresEditados.nombre}
                                            onChange={handleInputChange}
                                            className="text-center text-lg font-semibold px-2 py-1 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary mb-1 w-full"
                                            placeholder="Nombre"
                                        />
                                    ) : (
                                        <h3 className="text-xl font-semibold text-white capitalize text-center mb-1">{usuario.nombre}</h3>
                                    )}

                                    {/* Email */}
                                    {isEditingCurrentUser ? (
                                         <div className='relative w-full mb-3'>
                                             <RiMailFill className='absolute top-1/2 -translate-y-1/2 left-3 text-primary/70' />
                                             <input
                                                 type="email"
                                                 name="email"
                                                 value={valoresEditados.email}
                                                 onChange={handleInputChange}
                                                 className="text-sm pl-10 pr-2 py-1 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary w-full"
                                                 placeholder="Email"
                                             />
                                         </div>
                                    ) : (
                                        <p className="text-sm text-gray-400 text-center mb-3 flex items-center gap-2 justify-center">
                                            <RiMailFill className="text-primary/70" /> {usuario.email}
                                        </p>
                                    )}
                                </div>

                                {/* Separator */}
                                <hr className="border-secondary-700 w-full mb-4"/>

                                {/* Details Section */}
                                <div className="w-full space-y-3 text-sm mb-4">
                                    {/* Rol */}
                                    <div className="flex items-center justify-between gap-2">
                                        <span className="text-gray-400 font-medium flex items-center gap-2 shrink-0"><FaBriefcase className="text-primary/80"/> Rol:</span>
                                        {isEditingCurrentUser ? (
                                            <select
                                                name="roles"
                                                value={valoresEditados.roles}
                                                onChange={handleInputChange}
                                                className="px-2 py-1 border border-gray-600 rounded-md text-white text-sm bg-gray-700 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary w-full max-w-[calc(100%-60px)]" // Adjust width
                                            >
                                                <option className="text-primary" value="" disabled>Seleccione un rol</option>
                                                {roleOptions.map(option => (
                                                     <option key={option.value} value={option.value}>{option.label}</option>
                                                 ))}
                                            </select>
                                        ) : (
                                             // Display translated role, assuming only one role from the backend
                                             <span className="text-gray-200 font-medium text-right truncate" title={getRoleLabel(usuario.roles[0])}>
                                                 {getRoleLabel(usuario.roles[0])}
                                             </span>
                                        )}
                                    </div>

                                    {/* Estado */}
                                    <div className="flex items-center justify-between gap-2">
                                        <span className="text-gray-400 font-medium flex items-center gap-2 shrink-0">
                                           {/* Consistent icon based on actual status, even during edit */}
                                           {usuario.estado ? <FaCheckCircle className="text-green-500"/> : <FaMinusCircle className="text-red-500"/>}
                                           Estado:
                                        </span>
                                        {isEditingCurrentUser ? (
                                            <select
                                                name="estado"
                                                // Ensure value matches option values ('true' or 'false' string)
                                                value={String(valoresEditados.estado)}
                                                onChange={handleInputChange}
                                                className="px-2 py-1 border border-gray-600 rounded-md text-white text-sm bg-gray-700 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary w-full max-w-[calc(100%-70px)]" // Adjust width
                                            >
                                                <option value="true">Activo</option>
                                                <option value="false">Inactivo</option>
                                            </select>
                                        ) : (
                                            <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${usuario.estado ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}`}>
                                                {usuario.estado ? "Activo" : "Inactivo"}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div> {/* End Card Body */}

                            {/* Action Buttons Footer */}
                            <div className="w-full p-4 bg-secondary-900/50 border-t border-secondary-700 flex justify-center items-center gap-3 mt-auto"> {/* Push to bottom */}
                                {isEditingCurrentUser ? (
                                    <>
                                        <button
                                            onClick={() => guardarCambios(usuario._id)}
                                            disabled={isSaving}
                                            className={`flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white text-sm px-4 py-2 rounded-md shadow-sm transition duration-150 ease-in-out ${isSaving ? 'opacity-50 cursor-not-allowed' : ''}`}
                                        >
                                           {isSaving ? <FaSpinner className="animate-spin"/> : <FaSave />} {isSaving ? 'Guardando...' : 'Guardar'}
                                        </button>
                                        <button
                                            onClick={cancelarEdicion}
                                            disabled={isSaving} // Disable cancel while saving
                                            className="flex items-center gap-2 bg-gray-600 hover:bg-gray-700 text-gray-200 text-sm px-4 py-2 rounded-md shadow-sm transition duration-150 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            <FaTimesCircle /> Cancelar
                                        </button>
                                    </>
                                ) : (
                                    <button
                                        onClick={() => comenzarEdicion(usuario)}
                                        className="flex items-center gap-2 bg-primary hover:bg-primary/80 text-black text-sm px-4 py-2 rounded-md shadow-sm transition duration-150 ease-in-out"
                                    >
                                        <FaUserEdit /> Editar Usuario
                                    </button>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};