export const updateParticleTargets = (shapeType, width, height, particles) => {
    const particleCount = particles.length;
    const cx = width / 2;
    const cy = height / 2 - 25; 
    const scale = width * 0.23; // Responsive based on width

    particles.forEach((p, i) => {
        let tx, ty;
        
        if (shapeType === 'tech') { // Bangalore: Laptop + Mobile + Headphone
            if (i < particleCount * 0.4) { // Laptop (Left)
                const lx = cx - scale * 1.8;
                if (i < particleCount * 0.25) { // Screen
                    tx = lx + Math.random() * scale * 1.2;
                    ty = cy - scale * 0.6 + Math.random() * scale * 0.8;
                } else { // Base
                    tx = lx - scale * 0.1 + Math.random() * scale * 1.4;
                    ty = cy + scale * 0.2 + Math.random() * scale * 0.1;
                }
            } else if (i < particleCount * 0.6) { // Mobile (Center)
                const mx = cx;
                tx = mx + (Math.random() - 0.5) * scale * 0.4;
                ty = cy - scale * 0.3 + Math.random() * scale * 0.6;
            } else { // Headphone (Right)
                const hx = cx + scale * 1.5;
                const angle = Math.PI + Math.random() * Math.PI;
                const r = scale * 0.5;
                if (i < particleCount * 0.8) { // Arc
                    tx = hx + Math.cos(angle) * r;
                    ty = cy - scale * 0.3 + Math.sin(angle) * r;
                } else { // Ear cups
                    const side = i % 2 === 0 ? -1 : 1;
                    tx = hx + side * r + (Math.random() - 0.5) * scale * 0.2;
                    ty = cy - scale * 0.3 + (Math.random() - 0.5) * scale * 0.3;
                }
            }

        } else if (shapeType === 'valley') { // Imphal: Mountain, Lake, Group of People
            if (i < particleCount * 0.3) { // Mountains (Back)
                const mx = cx + (Math.random() - 0.5) * scale * 4;
                const peak1 = Math.exp(-Math.pow((mx - (cx - scale)) / scale, 2)) * scale * 1.5;
                const peak2 = Math.exp(-Math.pow((mx - (cx + scale)) / scale, 2)) * scale * 1.2;
                ty = cy - Math.max(peak1, peak2) + scale * 0.5;
                tx = mx;
            } else if (i < particleCount * 0.6) { // Lake (Bottom)
                const lx = cx + (Math.random() - 0.5) * scale * 4;
                tx = lx;
                ty = cy + scale * 0.8 + Math.sin(lx / scale * 5) * scale * 0.05 + Math.random() * scale * 0.1;
            } else { // Group of People (Foreground Center)
                const groupX = cx;
                const person = i % 5; 
                const px = groupX + (person - 2) * scale * 0.3;
                tx = px + (Math.random() - 0.5) * scale * 0.1;
                ty = cy + scale * 0.5 + (Math.random() - 0.5) * scale * 0.4;
            }

        } else if (shapeType === 'study') { // Jaipur: Books, Pens (Parallel), Cycle, 3 Kittens
            if (i < particleCount * 0.25) { // Books (Left)
                const bx = cx - scale * 1.5;
                const stack = i % 5;
                tx = bx + (Math.random() - 0.5) * scale * 0.8;
                ty = cy + (stack - 2) * scale * 0.15;
            } else if (i < particleCount * 0.4) { // Pens (Center - Parallel)
                const px = cx;
                const t = Math.random();
                // Two pens parallel vertical
                if (i % 2 === 0) {
                    tx = px - scale * 0.2 + (Math.random() - 0.5) * scale * 0.1;
                    ty = cy - scale * 0.4 + t * scale * 0.8;
                } else {
                    tx = px + scale * 0.2 + (Math.random() - 0.5) * scale * 0.1;
                    ty = cy - scale * 0.4 + t * scale * 0.8;
                }
            } else if (i < particleCount * 0.7) { // Cycle (Right)
                const cycX = cx + scale * 1.5;
                if (i < particleCount * 0.6) { // Wheels
                    const wheel = i % 2 === 0 ? -1 : 1;
                    const wx = cycX + wheel * scale * 0.4;
                    const angle = Math.random() * Math.PI * 2;
                    const r = scale * 0.3;
                    tx = wx + Math.cos(angle) * r;
                    ty = cy + scale * 0.5 + Math.sin(angle) * r;
                } else { // Frame
                    tx = cycX + (Math.random() - 0.5) * scale * 1.0;
                    ty = cy + scale * 0.2 + (Math.random() - 0.5) * scale * 0.3;
                }
            } else { // 3 Kittens (Bottom Foreground)
                const kx = cx;
                const kit = i % 3;
                const kpx = kx + (kit - 1) * scale * 0.5;
                const angle = Math.random() * Math.PI * 2;
                const r = Math.random() * scale * 0.15;
                tx = kpx + Math.cos(angle) * r;
                ty = cy + scale * 0.8 + Math.sin(angle) * r;
            }

        } else if (shapeType === 'beach') { // Trivandrum: Waves, Beach Boy Girl, Coconut, Cat, Heart
            if (i < particleCount * 0.3) { // Waves (Bottom)
                const wx = cx + (Math.random() - 0.5) * scale * 5;
                tx = wx;
                ty = cy + scale * 0.8 + Math.sin(wx / scale * 4 + Math.random()) * scale * 0.2;
            } else if (i < particleCount * 0.5) { // Boy & Girl (Center - Realistic)
                const isBoy = i % 2 === 0;
                const centerX = isBoy ? cx - scale * 0.25 : cx + scale * 0.25;
                const rand = Math.random();
                
                if (rand < 0.2) { // Head
                    const angle = Math.random() * Math.PI * 2;
                    const r = Math.random() * scale * 0.08;
                    tx = centerX + Math.cos(angle) * r;
                    ty = cy - scale * 0.35 + Math.sin(angle) * r;
                } else if (rand < 0.5) { // Torso / Dress
                    if (isBoy) {
                        tx = centerX + (Math.random() - 0.5) * scale * 0.12;
                        ty = cy - scale * 0.25 + Math.random() * scale * 0.35;
                    } else {
                        // Dress shape (trapezoid)
                        const progress = Math.random(); // 0 (top) to 1 (bottom)
                        const widthAtY = scale * 0.1 + progress * scale * 0.2;
                        tx = centerX + (Math.random() - 0.5) * widthAtY;
                        ty = cy - scale * 0.25 + progress * scale * 0.4;
                    }
                } else if (rand < 0.75) { // Arms (holding hands)
                    const startX = centerX;
                    const startY = cy - scale * 0.2;
                    const endX = cx; // Meeting point
                    const endY = cy - scale * 0.1;
                    const t = Math.random();
                    tx = startX + (endX - startX) * t + (Math.random()-0.5)*scale*0.05;
                    ty = startY + (endY - startY) * t + (Math.random()-0.5)*scale*0.05;
                } else { // Legs
                    const leg = Math.random() > 0.5 ? -1 : 1;
                    const startY = isBoy ? cy + scale * 0.1 : cy + scale * 0.15;
                    const endY = cy + scale * 0.5;
                    const t = Math.random();
                    tx = centerX + leg * scale * 0.05 * (1+t) + (Math.random()-0.5)*scale*0.05;
                    ty = startY + (endY - startY) * t;
                }
            } else if (i < particleCount * 0.7) { // Coconut Tree (Left)
                const tx_tree = cx - scale * 1.5;
                if (Math.random() > 0.3) { // Trunk
                    tx = tx_tree + (Math.random() - 0.5) * scale * 0.1;
                    ty = cy + scale * 0.5 - Math.random() * scale * 1.2;
                } else { // Leaves
                    const angle = Math.random() * Math.PI * 2;
                    const r = Math.random() * scale * 0.5;
                    tx = tx_tree + Math.cos(angle) * r;
                    ty = cy - scale * 0.6 + Math.sin(angle) * r;
                }
            } else if (i < particleCount * 0.85) { // Cat (Right)
                const catX = cx + scale * 1.2;
                const angle = Math.random() * Math.PI * 2;
                const r = Math.random() * scale * 0.15;
                tx = catX + Math.cos(angle) * r;
                ty = cy + scale * 0.6 + Math.sin(angle) * r;
            } else { // Small Heart (Above Couple)
                const t = Math.random() * Math.PI * 2;
                const x = 16 * Math.pow(Math.sin(t), 3);
                const y = -(13 * Math.cos(t) - 5 * Math.cos(2*t) - 2 * Math.cos(3*t) - Math.cos(4*t));
                tx = cx + x * (scale / 40);
                ty = cy - scale * 0.6 + y * (scale / 40);
            }

        } else if (shapeType === 'play') { // Amritsar: Car (Big), Bat Ball, Football
            if (i < particleCount * 0.5) { // Car (Left - Bigger)
                const carX = cx - scale * 1.2;
                const shiftY = scale * 0.2;
                if (i < particleCount * 0.2) { // Wheels
                    const wheel = i % 2 === 0 ? -1 : 1;
                    const wx = carX + wheel * scale * 0.5;
                    const angle = Math.random() * Math.PI * 2;
                    const r = scale * 0.25;
                    tx = wx + Math.cos(angle) * r;
                    ty = cy + shiftY + scale * 0.3 + Math.sin(angle) * r;
                } else { // Body
                    tx = carX + (Math.random() - 0.5) * scale * 1.6;
                    ty = cy + shiftY - scale * 0.2 + (Math.random() - 0.5) * scale * 0.4;
                }
            } else if (i < particleCount * 0.75) { // Bat & Ball (Center)
                const batX = cx + scale * 0.5;
                if (i < particleCount * 0.65) { // Bat (Vertical)
                    tx = batX + (Math.random() - 0.5) * scale * 0.15;
                    ty = cy + (Math.random() - 0.5) * scale * 0.8;
                } else { // Ball (Small circle)
                    const angle = Math.random() * Math.PI * 2;
                    const r = scale * 0.1;
                    tx = batX + scale * 0.3 + Math.cos(angle) * r;
                    ty = cy + scale * 0.4 + Math.sin(angle) * r;
                }
            } else { // Football (Right)
                const fbX = cx + scale * 1.5;
                const angle = Math.random() * Math.PI * 2;
                const r = scale * 0.25;
                tx = fbX + Math.cos(angle) * r;
                ty = cy + scale * 0.4 + Math.sin(angle) * r;
            }
        }
        
        p.tx = tx;
        p.ty = ty;
    });
};
