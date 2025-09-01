import { useEffect, useState, useRef } from 'react';

export const AnimatedBackground = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [scrollDirection, setScrollDirection] = useState<'down' | 'up'>('down');
  const lastScrollY = useRef(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sandParticles = useRef<Array<{
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    opacity: number;
    life: number;
  }>>([]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = currentScrollY / totalHeight;
      
      // Detect scroll direction
      setScrollDirection(currentScrollY > lastScrollY.current ? 'down' : 'up');
      lastScrollY.current = currentScrollY;
      
      setScrollProgress(Math.min(progress, 1));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Initialize sand particles
    const initParticles = () => {
      sandParticles.current = [];
      for (let i = 0; i < 150; i++) {
        sandParticles.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5, // Very slow movement
          vy: (Math.random() - 0.5) * 0.5, // Very slow movement
          size: Math.random() * 3 + 1,
          opacity: Math.random() * 0.8 + 0.2,
          life: Math.random() * 100 + 50
        });
      }
    };

    initParticles();

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Adjust animation direction based on scroll direction
      let effectiveProgress = scrollProgress;
      if (scrollDirection === 'up') {
        // When scrolling up, reverse the animation stages
        effectiveProgress = scrollProgress;
      }

      // Stage 1: Free-flowing sand particles on home page (0-0.25)
      if (effectiveProgress < 0.25) {
        // Create dynamic gradient background
        const gradient = ctx.createRadialGradient(
          canvas.width/2, canvas.height/2, 0,
          canvas.width/2, canvas.height/2, Math.max(canvas.width, canvas.height)
        );
        gradient.addColorStop(0, `hsla(18, 65%, 55%, ${0.8 - effectiveProgress * 0.5})`);
        gradient.addColorStop(0.5, `hsla(25, 45%, 45%, ${0.6 - effectiveProgress * 0.3})`);
        gradient.addColorStop(1, `hsla(30, 35%, 25%, ${0.9 - effectiveProgress * 0.3})`);
        
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Animate sand particles freely
        sandParticles.current.forEach((particle, index) => {
          // Add gentle turbulence for natural movement
          const turbulence = 0.3;
          particle.vx += (Math.random() - 0.5) * turbulence;
          particle.vy += (Math.random() - 0.5) * turbulence;

          // Apply friction
          const friction = 0.98;
          particle.vx *= friction;
          particle.vy *= friction;

          particle.x += particle.vx;
          particle.y += particle.vy;

          // Wrap around edges for continuous flow
          if (particle.x < 0) particle.x = canvas.width;
          if (particle.x > canvas.width) particle.x = 0;
          if (particle.y < 0) particle.y = canvas.height;
          if (particle.y > canvas.height) particle.y = 0;

          // Draw particle - no color transformation on homepage
          const particleOpacity = particle.opacity;
          if (particleOpacity > 0) {
            ctx.save();
            ctx.globalAlpha = particleOpacity;
            
            // Keep original sand color
            let hue = 18;
            let saturation = 65;
            let lightness = 55;
            
            ctx.shadowColor = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
            ctx.shadowBlur = particle.size * 2;
            
            ctx.fillStyle = `hsl(${hue}, ${saturation}%, ${lightness + Math.sin(Date.now() * 0.002 + index) * 5}%)`;
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
          }
        });
      }

      // Stage 2: Sand convergence and brick formation (0.25-0.75)
      if (effectiveProgress >= 0.25 && effectiveProgress < 0.75) {
        const brickProgress = (effectiveProgress - 0.25) / 0.5;
        
        // When scrolling up, reverse the brick formation
        const animationProgress = scrollDirection === 'up' ? 1 - brickProgress : brickProgress;
        
        // Background transition
        const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
        const brickInfluence = Math.min(1, animationProgress * 1.2);
        
        gradient.addColorStop(0, `hsla(${18 + (12-18) * brickInfluence}, ${65 + (78-65) * brickInfluence}%, ${55 + (35-55) * brickInfluence}%, ${0.4 + animationProgress * 0.3})`);
        gradient.addColorStop(1, `hsla(25, 15%, 8%, ${0.8 + animationProgress * 0.2})`);
        
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Animate sand particles with convergence/divergence physics
        sandParticles.current.forEach((particle, index) => {
          const centerX = canvas.width / 2;
          const centerY = canvas.height / 2;
          const dx = centerX - particle.x;
          const dy = centerY - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (scrollDirection === 'down') {
            // Normal convergence behavior
            const gravity = Math.min(0.4, animationProgress * 2);
            
            if (distance > 0) {
              particle.vx += (dx / distance) * gravity;
              particle.vy += (dy / distance) * gravity;
            }
            
            const turbulence = Math.max(0.1, 0.3 - animationProgress);
            particle.vx += (Math.random() - 0.5) * turbulence;
            particle.vy += (Math.random() - 0.5) * turbulence;
            
            const friction = Math.max(0.85, 0.98 - animationProgress * 0.3);
            particle.vx *= friction;
            particle.vy *= friction;
          } else {
            // Reverse - divergence behavior (particles explode outward)
            const repulsion = Math.min(0.6, (1 - animationProgress) * 2);
            
            if (distance > 0 && distance < 200) {
              particle.vx -= (dx / distance) * repulsion;
              particle.vy -= (dy / distance) * repulsion;
            }
            
            const turbulence = 0.4 * (1 - animationProgress);
            particle.vx += (Math.random() - 0.5) * turbulence;
            particle.vy += (Math.random() - 0.5) * turbulence;
            
            const friction = 0.95;
            particle.vx *= friction;
            particle.vy *= friction;
          }

          particle.x += particle.vx;
          particle.y += particle.vy;

          // Spiral effect when converging
          if (distance < 100 && animationProgress > 0.3 && scrollDirection === 'down') {
            const angle = Math.atan2(dy, dx) + animationProgress * 0.1;
            const targetRadius = 60 - animationProgress * 30;
            const targetX = centerX + Math.cos(angle) * targetRadius;
            const targetY = centerY + Math.sin(angle) * targetRadius;
            
            particle.x = particle.x * 0.9 + targetX * 0.1;
            particle.y = particle.y * 0.9 + targetY * 0.1;
          }

          // Draw particle with color transformation
          const particleOpacity = particle.opacity * Math.max(0.2, 1 - animationProgress * 1.5);
          if (particleOpacity > 0) {
            ctx.save();
            ctx.globalAlpha = particleOpacity;
            
            // Transform sand color to brick color based on animation progress
            let hue = 18;
            let saturation = 65;
            let lightness = 55;
            
            if (distance < 150 && scrollDirection === 'down') {
              const transformProgress = Math.min(1, (150 - distance) / 150 + animationProgress);
              hue = 18 + (12 - 18) * transformProgress;
              saturation = 65 + (78 - 65) * transformProgress;
              lightness = 55 + (45 - 55) * transformProgress;
            }
            
            ctx.shadowColor = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
            ctx.shadowBlur = particle.size * (2 + animationProgress * 3);
            
            ctx.fillStyle = `hsl(${hue}, ${saturation}%, ${lightness + Math.sin(Date.now() * 0.002 + index) * 5}%)`;
            ctx.beginPath();
            
            // Gradually make particles more angular/brick-like
            if (distance < 100 && animationProgress > 0.4 && scrollDirection === 'down') {
              const brickiness = Math.min(1, (100 - distance) / 100 * animationProgress * 3);
              const size = particle.size * (1 + brickiness);
              ctx.fillRect(particle.x - size/2, particle.y - size/2, size, size/2);
            } else {
              ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
              ctx.fill();
            }
            ctx.restore();
          }
        });

        // Draw brick formation (with reverse animation when scrolling up)
        const brickWidth = 80 + animationProgress * 80;
        const brickHeight = 40 + animationProgress * 40;
        const brickX = canvas.width / 2 - brickWidth / 2;
        const brickY = canvas.height / 2 - brickHeight / 2;

        // Brick appearance/disappearance based on scroll direction
        const brickOpacity = scrollDirection === 'up' ? animationProgress : 1;
        
        if (brickOpacity > 0) {
          // Brick shadow
          ctx.save();
          ctx.globalAlpha = brickOpacity;
          ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
          ctx.filter = 'blur(3px)';
          ctx.fillRect(brickX + 5, brickY + 5, brickWidth, brickHeight);
          ctx.restore();

          // Main brick
          const solidification = Math.min(1, animationProgress * 2);
          
          ctx.save();
          ctx.globalAlpha = brickOpacity;
          
          const brickGradient = ctx.createLinearGradient(brickX, brickY, brickX + brickWidth, brickY + brickHeight);
          brickGradient.addColorStop(0, `hsl(12, ${88 * solidification}%, ${45 + (1-solidification) * 10}%)`);
          brickGradient.addColorStop(0.3, `hsl(12, ${78 * solidification}%, ${35 + (1-solidification) * 15}%)`);
          brickGradient.addColorStop(0.7, `hsl(12, ${68 * solidification}%, ${55 + (1-solidification) * 5}%)`);
          brickGradient.addColorStop(1, `hsl(12, ${58 * solidification}%, ${25 + (1-solidification) * 20}%)`);
          
          ctx.fillStyle = brickGradient;
          ctx.fillRect(brickX, brickY, brickWidth, brickHeight);
          ctx.restore();

          // WIN text
          if (animationProgress > 0.2) {
            const textProgress = Math.min(1, (animationProgress - 0.2) * 2.5);
            
            ctx.font = `bold ${Math.max(16, brickWidth * 0.15)}px Arial`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            
            ctx.save();
            ctx.globalAlpha = textProgress * brickOpacity;
            ctx.fillStyle = `rgba(255, 255, 255, ${0.9 * textProgress})`;
            ctx.shadowColor = 'rgba(255, 255, 255, 0.5)';
            ctx.shadowBlur = 1;
            ctx.fillText('WIN', canvas.width / 2, canvas.height / 2);
            ctx.restore();
          }
        }
      }

      // Stage 3: House construction (0.75-1.0)
      if (effectiveProgress >= 0.75) {
        const houseProgress = (effectiveProgress - 0.75) / 0.25;
        const animationProgress = scrollDirection === 'up' ? 1 - houseProgress : houseProgress;
        
        // Sky background
        const skyGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
        skyGradient.addColorStop(0, `hsla(210, 50%, 75%, ${0.9})`);
        skyGradient.addColorStop(1, `hsla(200, 40%, 85%, ${0.8})`);
        
        ctx.fillStyle = skyGradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Ground
        ctx.fillStyle = 'hsl(30, 25%, 15%)';
        ctx.fillRect(0, canvas.height * 0.8, canvas.width, canvas.height * 0.2);

        // House construction with reverse animation
        const houseWidth = 200;
        const houseHeight = 150;
        const houseX = canvas.width / 2 - houseWidth / 2;
        const houseY = canvas.height * 0.8 - houseHeight;

        const houseOpacity = scrollDirection === 'up' ? animationProgress : 1;

        // Foundation
        if (animationProgress > 0) {
          ctx.save();
          ctx.globalAlpha = houseOpacity;
          ctx.fillStyle = 'hsl(30, 25%, 25%)';
          const foundationHeight = Math.min(20, 20 * animationProgress * 3);
          ctx.fillRect(houseX - 10, houseY + houseHeight - foundationHeight, houseWidth + 20, foundationHeight);
          ctx.restore();
        }

        // Walls (with reverse brick-by-brick when scrolling up)
        if (animationProgress > 0.2) {
          const wallProgress = Math.min(1, (animationProgress - 0.2) * 2);
          const bricksPerRow = 8;
          const brickW = houseWidth / bricksPerRow;
          const brickH = 15;
          const totalRows = Math.floor(houseHeight / brickH);
          const completedRows = Math.floor(totalRows * wallProgress);
          
          ctx.save();
          ctx.globalAlpha = houseOpacity;
          
          for (let row = 0; row < completedRows; row++) {
            const offset = (row % 2) * (brickW / 2);
            for (let col = 0; col < bricksPerRow; col++) {
              const bx = houseX + col * brickW + offset;
              const by = houseY + houseHeight - (row + 1) * brickH;
              
              // Brick shadow
              ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
              ctx.fillRect(bx + 1, by + 1, brickW - 2, brickH - 2);
              
              // Brick
              const brickGrad = ctx.createLinearGradient(bx, by, bx + brickW, by + brickH);
              brickGrad.addColorStop(0, 'hsl(12, 78%, 45%)');
              brickGrad.addColorStop(1, 'hsl(12, 58%, 35%)');
              
              ctx.fillStyle = brickGrad;
              ctx.fillRect(bx, by, brickW - 2, brickH - 2);
              
              // Mortar lines
              ctx.strokeStyle = 'hsl(30, 25%, 25%)';
              ctx.lineWidth = 1;
              ctx.strokeRect(bx, by, brickW - 2, brickH - 2);
            }
          }
          ctx.restore();
        }

        // Roof
        if (animationProgress > 0.6) {
          const roofProgress = Math.min(1, (animationProgress - 0.6) * 2.5);
          
          ctx.save();
          ctx.globalAlpha = roofProgress * houseOpacity;
          
          // Roof shadow
          ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
          ctx.beginPath();
          ctx.moveTo(houseX - 15 + 3, houseY + 3);
          ctx.lineTo(houseX + houseWidth / 2 + 3, houseY - 50 + 3);
          ctx.lineTo(houseX + houseWidth + 15 + 3, houseY + 3);
          ctx.fill();
          
          // Main roof
          const roofGradient = ctx.createLinearGradient(houseX, houseY - 50, houseX, houseY);
          roofGradient.addColorStop(0, 'hsl(30, 25%, 35%)');
          roofGradient.addColorStop(1, 'hsl(30, 25%, 25%)');
          
          ctx.fillStyle = roofGradient;
          ctx.beginPath();
          ctx.moveTo(houseX - 15, houseY);
          ctx.lineTo(houseX + houseWidth / 2, houseY - 50);
          ctx.lineTo(houseX + houseWidth + 15, houseY);
          ctx.fill();
          
          ctx.restore();
        }

        // Door and windows
        if (animationProgress > 0.8) {
          const detailProgress = (animationProgress - 0.8) * 5;
          
          ctx.save();
          ctx.globalAlpha = Math.min(1, detailProgress) * houseOpacity;
          
          // Door
          ctx.fillStyle = 'hsl(30, 35%, 20%)';
          ctx.fillRect(houseX + houseWidth / 2 - 15, houseY + houseHeight - 40, 30, 40);
          
          // Door handle
          ctx.fillStyle = 'hsl(45, 70%, 60%)';
          ctx.beginPath();
          ctx.arc(houseX + houseWidth / 2 + 8, houseY + houseHeight - 20, 2, 0, Math.PI * 2);
          ctx.fill();
          
          // Windows
          ctx.fillStyle = 'hsl(200, 50%, 80%)';
          ctx.fillRect(houseX + 30, houseY + houseHeight - 80, 25, 25);
          ctx.fillRect(houseX + houseWidth - 55, houseY + houseHeight - 80, 25, 25);
          
          // Window frames
          ctx.strokeStyle = 'hsl(30, 25%, 15%)';
          ctx.lineWidth = 2;
          ctx.strokeRect(houseX + 30, houseY + houseHeight - 80, 25, 25);
          ctx.strokeRect(houseX + houseWidth - 55, houseY + houseHeight - 80, 25, 25);
          
          ctx.restore();
        }
      }

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [scrollProgress]);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ imageRendering: 'auto' }}
      />
      
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-background/10" />
    </div>
  );
};