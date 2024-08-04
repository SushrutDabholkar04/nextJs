import React, { useState } from 'react';
import { AdBanner } from '../types';
import styles from './EditBannerTemplateBs.module.css';

interface EditBannerTemplateBsProps {
  open: boolean;
  initialData: AdBanner;
  onSave: (updatedBanner: AdBanner) => void;
  onClose: () => void;
}

const EditBannerTemplateBs: React.FC<EditBannerTemplateBsProps> = ({ open, initialData, onSave, onClose }) => {
  const [bannerData, setBannerData] = useState<AdBanner>(initialData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setBannerData({ ...bannerData, [name]: value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      const imageUrl = URL.createObjectURL(files[0]);
      setBannerData({ ...bannerData, image: imageUrl });
    }
  };

  const handleSubmit = () => {
    onSave(bannerData);
  };

  const handleDownload = () => {
    if (bannerData.image || initialData.background) {
      const imageUrl = bannerData.image || initialData.background;
      const link = document.createElement('a');
      link.href = imageUrl;
      link.download = 'banner.png'; 
      document.body.appendChild(link); 
      link.click();
      document.body.removeChild(link); 
    }
  };

  if (!open) return null;

  return (
    <div className={styles.container}>
      <div className={styles.header}>Edit Banner</div>
      <div className={styles.inputGroup}>
        <label className={styles.label}>Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className={styles.fileInput}
        />
        {bannerData.image && (
          <img src={bannerData.image} alt="Selected" className={styles.imagePreview} />
        )}
      </div>
      <div className={styles.inputGroup}>
        <label className={styles.label}>Title</label>
        <input
          name="title"
          value={bannerData.title}
          onChange={handleChange}
          placeholder="Title"
          className={styles.inputField}
        />
      </div>
      <div className={styles.inputGroup}>
        <label className={styles.label}>Description</label>
        <textarea
          name="description"
          value={bannerData.description}
          onChange={handleChange}
          placeholder="Description"
          className={styles.textareaField}
        />
      </div>
      <div className={styles.inputGroup}>
        <label className={styles.label}>Button Text</label>
        <input
          name="cta"
          value={bannerData.cta}
          onChange={handleChange}
          placeholder="Button Text"
          className={styles.inputField}
        />
      </div>
      <div className={styles.buttonContainer}>
        <button onClick={handleDownload} className={styles.downloadButton}>Download</button>
        <button onClick={onClose} className={styles.cancelButton}>Cancel</button>
        <button onClick={handleSubmit} className={styles.buttonDone}>Done</button>
      </div>
    </div>
  );
};

export default EditBannerTemplateBs;
