"use client";
import React from 'react';
import { IconButton, Card, CardContent, Typography, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import styles from './BannerImageComp.module.css'; 

interface BannerProps {
  id: number;
  title: string;
  description: string;
  cta: string;
  image: string;
  background: string;
  onEdit: (id: number) => void;
}

const BannerImageComp: React.FC<BannerProps> = ({ id, title, description, cta, image, background, onEdit }) => {
  return (
    <Card className={styles.bannerCard} style={{ backgroundImage: `url(${background})` }}>
       <Typography className={styles.title} variant="h5">{title}</Typography>
      <CardContent className={styles.cardContent}>
       
        <Typography variant="body2">{description}</Typography>
        <Button variant="contained">{cta}</Button>
      </CardContent>
      <IconButton onClick={() => onEdit(id)} className={styles.editIcon}>
        <EditIcon />
      </IconButton>
    </Card>
  );
};

export default BannerImageComp;
