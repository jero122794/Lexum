'use client';
import { useState } from 'react';
import styles from './Testimonials.module.css';

const testimonials = [
  {
    quote: "“Pudimos publicar una versión funcional de todo el sitio web en menos de dos semanas. Y no tuvimos que renunciar a nuestros diseños originales”.",
    author: 'Juan Sepulveda',
    role: 'Abogoda En JPS',
    avatar: '/avatar.png',
    logo: '/company.png',
  },
  {
    quote: "“Pudimos publicar una versión funcional de todo el sitio web en menos de dos semanas. Y no tuvimos que renunciar a nuestros diseños originales”.",
    author: 'Lucas Montoya',
    role: 'Cofundador de Lexeum',
    avatar: '/avatar.png',
    logo: '/company.png',
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);

  const handleNext = () => {
    setCurrent((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className={styles.testimonials}>
      <h2 className={styles.heading}>Lo que dicen nuestros clientes</h2>
      <div className={styles.slider}>
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className={`${styles.card} ${index === current ? styles.active : ''}`}
          >
            <div className={styles.cardTop}>
              <img
                src={testimonial.avatar}
                alt={testimonial.author}
                className={styles.avatar}
              />
              <img
                src={testimonial.logo}
                alt="Logo"
                className={styles.logo}
              />
            </div>
            <p className={styles.quote}>{testimonial.quote}</p>
            <div className={styles.authorInfo}>
              <strong>{testimonial.author}</strong>
              <span>{testimonial.role}</span>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.controls}>
        <button onClick={handlePrev}>&larr;</button>
        <button onClick={handleNext}>&rarr;</button>
      </div>
    </section>
  );
}
