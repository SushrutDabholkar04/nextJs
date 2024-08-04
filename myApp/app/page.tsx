"use client";

import { useState } from 'react';
import BannerImageComp from '../components/BannerImageComp';
import EditBannerTemplateBs from '../components/EditBannerTemplateBs';
import adBanners from '../public/adBanners.json';
import { AdBanner } from '../types';
import styles from './page.module.css'; 

export default function Home() {
  const [banners, setBanners] = useState<AdBanner[]>(adBanners as AdBanner[]);
  const [editingBanner, setEditingBanner] = useState<AdBanner | null>(null);

  const handleEdit = (id: number) => {
    const banner = banners.find(b => b.id === id);
    setEditingBanner(banner || null);
  };

  const handleSave = (updatedBanner: AdBanner) => {
    setBanners(banners.map(b => b.id === updatedBanner.id ? updatedBanner : b));
    setEditingBanner(null);
  };

  const handleClose = () => {
    setEditingBanner(null);
  };

  return (
    <div className={styles.gridContainer}>
      {banners.map(banner => (
        <BannerImageComp
          key={banner.id}
          {...banner}
          onEdit={() => handleEdit(banner.id)}
        />
      ))}
      {editingBanner && (
        <EditBannerTemplateBs
          open={!!editingBanner}
          initialData={editingBanner}
          onSave={handleSave}
          onClose={handleClose}
        />
      )}
    </div>
  );
}
