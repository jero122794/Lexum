'use client';
import { useState, useMemo, useRef, useEffect } from 'react';
import styles from './contratos.module.css';
import { FiFileText, FiDownload, FiEdit, FiSearch, FiPlus, FiMoreHorizontal, FiX, FiMessageSquare } from 'react-icons/fi';
import { format } from 'date-fns';
import { es } from 'date-fns/locale/es';
import { jsPDF } from 'jspdf'; // <-- Importamos jsPDF

// --- DATOS FUERA DEL COMPONENTE ---
const INITIAL_TEMPLATES_DATA = [
  { id: 1, name: 'Contrato de arrendamiento', description: 'Contrato estándar para alquiler de vivienda o local comercial.', popular: true },
  { id: 2, name: 'Contrato de compraventa', description: 'Para transacciones de bienes muebles o inmuebles.', popular: false },
  { id: 3, name: 'Contrato laboral', description: 'Contrato de trabajo conforme a la legislación vigente.', popular: false },
  { id: 4, name: 'Acuerdo de confidencialidad', description: 'NDA para proteger información sensible.', popular: false },
];

const RECENT_CONTRACTS_DATA = [
  { id: 1, name: 'Contrato_de_arrendamient_smith', type: 'Documento', client: 'Smith vs. Jones', status: 'En curso', date: 'May 12, 2023' },
  { id: 2, name: 'Acuerdo_confidencialidad_v3', type: 'Documento', client: 'Tech Solutions SL', status: 'Firmado', date: 'May 20, 2023' },
  { id: 3, name: 'Contrato_laboral_Gomez', type: 'Documento', client: 'María García', status: 'En revisión', date: 'Jun 05, 2023' },
];

const ALL_CLIENTS_DATA = [
  { name: 'Smith vs. Jones' },
  { name: 'Tech Solutions SL' },
  { name: 'María García' },
  { name: 'Pedro López' },
  { name: 'Ana Martínez' },
];

export default function ContratosPage() {
  const [templates, setTemplates] = useState(INITIAL_TEMPLATES_DATA);
  const [recentContracts, setRecentContracts] = useState(RECENT_CONTRACTS_DATA);
  const [showTemplateActionsId, setShowTemplateActionsId] = useState(null);
  const actionsMenuRef = useRef(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(null); // Para el modal de "Usar plantilla"
  const [showModifyModal, setShowModifyModal] = useState(false);
  const [templateToModify, setTemplateToModify] = useState(null);
  const [newContractForm, setNewContractForm] = useState({
    name: '',
    client: ALL_CLIENTS_DATA[0].name,
    startDate: format(new Date(), 'yyyy-MM-dd'),
    template: '',
  });

  // Efecto para cerrar el menú de acciones al hacer clic fuera
  useEffect(() => {
    function handleClickOutside(event) {
      if (actionsMenuRef.current && !actionsMenuRef.current.contains(event.target)) {
        setShowTemplateActionsId(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [actionsMenuRef]);

  // --- LÓGICA DE DESCARGA DE ARCHIVOS ---
  /**
   * Genera un Blob de PDF a partir de los detalles del contrato.
   * @param {Object} contractDetails Detalles del contrato para el contenido.
   * @returns {Blob} El Blob del archivo PDF.
   */
  const generateContractPDF = (contractDetails) => {
    const { name, client, template, startDate } = contractDetails;
    
    // Convertimos la fecha a un objeto Date para formatearla
    const dateObject = new Date(startDate);
    const formattedDate = format(dateObject, 'dd MMMM yyyy', { locale: es });
    
    const doc = new jsPDF();
    
    // Añadir contenido al PDF
    doc.setFont('Helvetica', 'Bold');
    doc.setFontSize(26);
    doc.text(name, 20, 30);
    
    doc.setFont('Helvetica', 'Normal');
    doc.setFontSize(12);
    doc.setTextColor(100, 100, 100);
    doc.text(`Generado desde la plantilla: ${template}`, 20, 40);
    
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0); // Texto negro
    doc.text(`\n\nCliente: ${client}\nFecha de Creación: ${formattedDate}\n\n`, 20, 60);

    doc.setFontSize(11);
    doc.setTextColor(50, 50, 50);
    const contentText = `Este es un documento de ejemplo generado automáticamente por la plataforma Lexeum. El contenido real del contrato legal no está incluido en esta simulación. 

Este documento está diseñado para fines de demostración. Las cláusulas específicas, términos y condiciones legales deben ser revisados y validados por un profesional del derecho.`;

    // Divide el texto para que se ajuste al ancho del documento
    const textLines = doc.splitTextToSize(contentText, 170); // 170mm de ancho
    doc.text(textLines, 20, 85);
    
    // Retorna el PDF como un Blob
    return doc.output('blob');
  };

  /**
   * Dispara la descarga de un archivo Blob en el navegador.
   * @param {Blob} blob El Blob del archivo.
   * @param {string} filename Nombre del archivo.
   */
  const handleDownload = (blob, filename) => {
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    URL.revokeObjectURL(url);
  };

  // Lógica para descargar la plantilla desde el menú de acciones
  const handleDownloadTemplate = (template) => {
    const templateDetails = {
      name: `Plantilla ${template.name}`,
      client: 'N/A',
      template: template.name,
      startDate: format(new Date(), 'yyyy-MM-dd')
    };
    const pdfBlob = generateContractPDF(templateDetails);
    const filename = `${template.name}_Plantilla.pdf`;
    handleDownload(pdfBlob, filename);
    setShowTemplateActionsId(null);
  };


  // Lógica para el modal de "Usar plantilla"
  const handleUseTemplate = (template) => {
    setSelectedTemplate(template);
    // Sugerir un nombre de archivo basado en la plantilla y la fecha
    setNewContractForm(prev => ({ ...prev, name: `${template.name}_${format(new Date(), 'yyyyMMdd')}`, template: template.name }));
    setShowModal(true);
  };
  const handleCloseModal = () => setShowModal(false);

  // Lógica para crear un nuevo contrato (AHORA DESCARGA EL PDF)
  const handleCreateContract = (e) => {
    e.preventDefault();
    if (!newContractForm.name || !newContractForm.client || !newContractForm.startDate) {
      alert('Por favor, completa todos los campos.');
      return;
    }
    const newContract = {
      id: recentContracts.length > 0 ? Math.max(...recentContracts.map(c => c.id)) + 1 : 1,
      name: newContractForm.name,
      type: 'Documento', // Tipo por defecto
      client: newContractForm.client,
      status: 'Firmado', // Estado por defecto para nuevos contratos
      date: format(new Date(newContractForm.startDate), 'MMM dd, yyyy'), // Formato de fecha de la tabla
    };
    setRecentContracts([newContract, ...recentContracts]);
    handleCloseModal();

    // 1. Genera el Blob del contrato en formato PDF
    const contractDetails = {
      name: newContract.name,
      client: newContract.client,
      template: selectedTemplate.name,
      startDate: newContractForm.startDate,
    };
    const pdfBlob = generateContractPDF(contractDetails);
    
    // 2. Dispara la descarga del archivo con extensión .pdf
    const filename = `${newContract.name}.pdf`;
    handleDownload(pdfBlob, filename);
    
    alert('Contrato creado con éxito y descargado como PDF!');
  };

  // Lógica para descargar un contrato desde la tabla de recientes
  const handleDownloadRecentContract = (contract) => {
    // Reutilizamos el generador de PDF para un contrato existente
    const contractDetails = {
      name: contract.name,
      client: contract.client,
      template: 'Plantilla base', // No tenemos el nombre de la plantilla en el dato mock
      startDate: contract.date,
    };
    const pdfBlob = generateContractPDF(contractDetails);
    const filename = `${contract.name}.pdf`;
    handleDownload(pdfBlob, filename);
  };

  // Lógica para modificar la plantilla
  const handleModifyTemplate = (template) => {
    setTemplateToModify(template);
    setShowModifyModal(true);
    setShowTemplateActionsId(null);
  };
  const handleCloseModifyModal = () => setShowModifyModal(false);
  const handleSaveModifiedTemplate = (e) => {
    e.preventDefault();
    alert('Plantilla modificada con éxito!');
    handleCloseModifyModal();
  };

  return (
    <div className={styles.contractsContainer}>
      {/* HEADER DE LA PÁGINA */}
      <header className={styles.pageHeader}>
        <div className={styles.titleContainer}>
          <h1 className={styles.pageTitle}>Contratos</h1>
          <p className={styles.pageSubtitle}>Genera y gestiona contratos legales</p>
        </div>
        <div className={styles.headerButtons}>
          <button className={styles.aiButton}><FiMessageSquare /> Asistente IA</button>
          <button className={styles.newContractButton} onClick={() => handleUseTemplate(templates[0])}>
            <FiPlus /> Nuevo contrato
          </button>
        </div>
      </header>

      {/* SECCIÓN DE PLANTILLAS */}
      <section className={styles.templatesSection}>
        <h2 className={styles.sectionTitle}>Plantillas de contratos</h2>
        <div className={styles.templateGrid}>
          {templates.map(template => (
            <div key={template.id} className={styles.templateCard}>
              <div className={styles.cardHeader}>
                <div className={styles.cardIcon}>
                  <FiFileText />
                </div>
                {template.popular && <span className={styles.popularBadge}>Popular</span>}
                
                {/* Botón de acciones para la plantilla */}
                <div className={styles.actionBtnWrapper}>
                  <button className={styles.actionBtn} onClick={(e) => {
                    e.stopPropagation();
                    setShowTemplateActionsId(showTemplateActionsId === template.id ? null : template.id);
                  }}>
                    <FiMoreHorizontal />
                  </button>
                  {showTemplateActionsId === template.id && (
                    <div ref={actionsMenuRef} className={styles.actionsMenu}>
                      <button onClick={() => handleModifyTemplate(template)}>
                        <FiEdit size={14} /> Modificar
                      </button>
                      <button onClick={() => handleDownloadTemplate(template)}>
                        <FiDownload size={14} /> Descargar
                      </button>
                    </div>
                  )}
                </div>
              </div>
              <h3 className={styles.cardTitle}>{template.name}</h3>
              <p className={styles.cardDescription}>{template.description}</p>
              <button className={styles.useTemplateButton} onClick={() => handleUseTemplate(template)}>
                Usar plantilla
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* SECCIÓN DE CONTRATOS RECIENTES */}
      <section className={styles.recentContractsSection}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Contratos recientes</h2>
          <a href="#" className={styles.viewAllLink}>Ver todos</a>
        </div>
        
        {/* Input de filtro al 90% de ancho */}
        <input
          type="text"
          placeholder="Buscar contratos recientes..."
          className={styles.recentSearchInput}
        />

        {/* TABLA DE CONTRATOS RECIENTES */}
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Tipo</th>
                <th>Cliente</th>
                <th>Estado</th>
                <th>Fecha</th>
              </tr>
            </thead>
            <tbody>
              {recentContracts.map(contract => (
                <tr key={contract.id}>
                  <td>
                    <div className={styles.contractNameCell}>
                      <FiFileText className={styles.contractIcon} size={20} />
                      {/* Ahora el nombre es un enlace que descarga el contrato */}
                      <a href="#" className={styles.contractName} onClick={(e) => {
                        e.preventDefault();
                        handleDownloadRecentContract(contract);
                      }}>
                        {contract.name}
                      </a>
                    </div>
                  </td>
                  <td>{contract.type}</td>
                  <td>{contract.client}</td>
                  <td><span className={`${styles.typeBadge} ${styles[contract.status.toLowerCase().replace(' ', '')]}`}>{contract.status}</span></td>
                  <td>{contract.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      
      {/* MODAL PARA USAR PLANTILLA / CREAR CONTRATO */}
      {showModal && (
        <div className={styles.modalBackdrop}>
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <h3 className={styles.modalTitle}>Crear contrato: {selectedTemplate?.name}</h3>
              <button className={styles.closeButton} onClick={handleCloseModal}>&times;</button>
            </div>
            <form onSubmit={handleCreateContract} className={styles.modalForm}>
              <div className={styles.formGrid}>
                <div className={styles.formGroup}>
                  <label>Nombre del contrato</label>
                  <input type="text" name="name" value={newContractForm.name} onChange={(e) => setNewContractForm({...newContractForm, name: e.target.value})} required />
                </div>
                <div className={styles.formGroup}>
                  <label>Cliente</label>
                  <select name="client" value={newContractForm.client} onChange={(e) => setNewContractForm({...newContractForm, client: e.target.value})} required>
                    {ALL_CLIENTS_DATA.map(client => <option key={client.name} value={client.name}>{client.name}</option>)}
                  </select>
                </div>
                <div className={styles.formGroup}>
                  <label>Fecha de inicio</label>
                  <input type="date" name="startDate" value={newContractForm.startDate} onChange={(e) => setNewContractForm({...newContractForm, startDate: e.target.value})} required />
                </div>
              </div>
              <div className={styles.modalActions}>
                <button type="button" className={`${styles.modalButton} ${styles.cancelButton}`} onClick={handleCloseModal}>Cancelar</button>
                <button type="submit" className={`${styles.modalButton} ${styles.saveButton}`}>Crear</button>
              </div>
            </form>
          </div>
        </div>
      )}
      
      {/* MODAL PARA MODIFICAR PLANTILLA */}
      {showModifyModal && (
        <div className={styles.modalBackdrop}>
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <h3 className={styles.modalTitle}>Modificar plantilla: {templateToModify?.name}</h3>
              <button className={styles.closeButton} onClick={handleCloseModifyModal}>&times;</button>
            </div>
            <form onSubmit={handleSaveModifiedTemplate} className={styles.modalForm}>
              <div className={styles.formGroup}>
                <label>Nombre de la plantilla</label>
                <input type="text" defaultValue={templateToModify?.name} />
              </div>
              <div className={styles.formGroup}>
                <label>Descripción</label>
                <textarea defaultValue={templateToModify?.description} rows="3"></textarea>
              </div>
              <div className={styles.modalActions}>
                <button type="button" className={`${styles.modalButton} ${styles.cancelButton}`} onClick={handleCloseModifyModal}>Cancelar</button>
                <button type="submit" className={`${styles.modalButton} ${styles.saveButton}`}>Guardar cambios</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}