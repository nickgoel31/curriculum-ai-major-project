'use client';

import { useEffect, useRef } from 'react';
import { useCurriculumStore, FullCurriculum } from '@/store/curriculumStore';

export default function CurriculumInitializer({ curriculum }: { curriculum: FullCurriculum }) {
  const initialized = useRef(false);
  const setCurriculumData = useCurriculumStore((state) => state.setCurriculumData);

  useEffect(() => {
    if (!initialized.current) {
      setCurriculumData(curriculum);
      initialized.current = true;
    }
  }, [curriculum, setCurriculumData]);

  return null;
}
