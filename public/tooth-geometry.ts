import * as THREE from 'three'

export interface ToothGeometry {
  name: string
  type: 'incisor' | 'canine' | 'premolar' | 'molar'
  condition: 'healthy' | 'cavity' | 'crown' | 'implant' | 'veneer' | 'root_canal'
  geometry: THREE.BufferGeometry
  materials: THREE.Material[]
  animations?: THREE.AnimationClip[]
}

export class ToothGeometryFactory {
  private static instance: ToothGeometryFactory
  private geometryCache: Map<string, ToothGeometry> = new Map()
  
  public static getInstance(): ToothGeometryFactory {
    if (!ToothGeometryFactory.instance) {
      ToothGeometryFactory.instance = new ToothGeometryFactory()
    }
    return ToothGeometryFactory.instance
  }

  public createToothGeometry(
    type: ToothGeometry['type'], 
    condition: ToothGeometry['condition']
  ): ToothGeometry {
    const cacheKey = `${type}_${condition}`
    
    if (this.geometryCache.has(cacheKey)) {
      return this.geometryCache.get(cacheKey)!
    }
    
    const geometry = this.generateToothGeometry(type, condition)
    this.geometryCache.set(cacheKey, geometry)
    
    return geometry
  }
  
  private generateToothGeometry(
    type: ToothGeometry['type'], 
    condition: ToothGeometry['condition']
  ): ToothGeometry {
    const baseGeometry = this.createBaseToothShape(type)
    const materials = this.createToothMaterials(condition)
    
    // Apply condition-specific modifications
    this.applyConditionModifications(baseGeometry, condition)
    
    return {
      name: `${type}_${condition}`,
      type,
      condition,
      geometry: baseGeometry,
      materials,
      animations: this.createToothAnimations(type, condition)
    }
  }
  
  private createBaseToothShape(type: ToothGeometry['type']): THREE.BufferGeometry {
    switch (type) {
      case 'incisor':
        return this.createIncissorGeometry()
      case 'canine':
        return this.createCanineGeometry()
      case 'premolar':
        return this.createPremolarGeometry()
      case 'molar':
        return this.createMolarGeometry()
      default:
        return this.createIncissorGeometry()
    }
  }
  
  private createIncissorGeometry(): THREE.BufferGeometry {
    // Create a realistic incisor shape using custom geometry
    const geometry = new THREE.BufferGeometry()
    
    // Crown (visible part)
    const crownVertices = [
      // Front face (rectangular with slight curve)
      -0.4, 0.0, 0.1,   0.4, 0.0, 0.1,   0.4, 1.2, 0.1,
      -0.4, 0.0, 0.1,   0.4, 1.2, 0.1,  -0.4, 1.2, 0.1,
      
      // Back face
      -0.3, 0.0, -0.1,  0.3, 0.0, -0.1,  0.3, 1.1, -0.1,
      -0.3, 0.0, -0.1,  0.3, 1.1, -0.1, -0.3, 1.1, -0.1,
      
      // Left side
      -0.4, 0.0, 0.1,  -0.3, 0.0, -0.1, -0.3, 1.1, -0.1,
      -0.4, 0.0, 0.1,  -0.3, 1.1, -0.1, -0.4, 1.2, 0.1,
      
      // Right side
      0.4, 0.0, 0.1,   0.3, 0.0, -0.1,  0.3, 1.1, -0.1,
      0.4, 0.0, 0.1,   0.3, 1.1, -0.1,  0.4, 1.2, 0.1,
      
      // Top (cutting edge)
      -0.4, 1.2, 0.1,  0.4, 1.2, 0.1,   0.3, 1.1, -0.1,
      -0.4, 1.2, 0.1,  0.3, 1.1, -0.1, -0.3, 1.1, -0.1,
    ]
    
    // Root (below gum line)
    const rootVertices = [
      // Tapered root extending downward
      -0.2, 0.0, 0.05,  0.2, 0.0, 0.05,  0.1, -1.5, 0.0,
      -0.2, 0.0, 0.05,  0.1, -1.5, 0.0, -0.1, -1.5, 0.0,
      
      -0.15, 0.0, -0.05, 0.15, 0.0, -0.05, 0.1, -1.5, 0.0,
      -0.15, 0.0, -0.05, 0.1, -1.5, 0.0, -0.1, -1.5, 0.0,
    ]
    
    const allVertices = [...crownVertices, ...rootVertices]
    
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(allVertices, 3))
    geometry.computeVertexNormals()
    
    return geometry
  }
  
  private createCanineGeometry(): THREE.BufferGeometry {
    // Similar to incisor but with pointed tip and longer root
    const geometry = new THREE.BufferGeometry()
    
    const vertices = [
      // Crown with pointed tip
      -0.35, 0.0, 0.1,  0.35, 0.0, 0.1,  0.0, 1.4, 0.05,
      -0.35, 0.0, 0.1,  0.0, 1.4, 0.05, -0.35, 0.8, 0.1,
      0.35, 0.0, 0.1,   0.0, 1.4, 0.05,  0.35, 0.8, 0.1,
      
      // Back face
      -0.25, 0.0, -0.1, 0.25, 0.0, -0.1, 0.0, 1.3, -0.05,
      
      // Root (longer than incisor)
      -0.15, 0.0, 0.05, 0.15, 0.0, 0.05, 0.0, -1.8, 0.0,
    ]
    
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3))
    geometry.computeVertexNormals()
    
    return geometry
  }
  
  private createPremolarGeometry(): THREE.BufferGeometry {
    // Wider crown with two cusps
    const geometry = new THREE.BufferGeometry()
    
    const vertices = [
      // Crown with two cusps
      -0.5, 0.0, 0.2,   0.5, 0.0, 0.2,   0.2, 1.0, 0.1,
      -0.5, 0.0, 0.2,   0.2, 1.0, 0.1,  -0.2, 1.0, 0.1,
      
      // Second cusp
      -0.2, 1.0, 0.1,   0.2, 1.0, 0.1,   0.0, 0.8, -0.1,
      
      // Root (may be bifurcated)
      -0.2, 0.0, 0.1,   0.2, 0.0, 0.1,   0.0, -1.3, 0.0,
    ]
    
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3))
    geometry.computeVertexNormals()
    
    return geometry
  }
  
  private createMolarGeometry(): THREE.BufferGeometry {
    // Large crown with multiple cusps and roots
    const geometry = new THREE.BufferGeometry()
    
    const vertices = [
      // Large crown with 4 cusps
      -0.6, 0.0, 0.3,   0.6, 0.0, 0.3,   0.3, 0.8, 0.2,
      -0.6, 0.0, 0.3,   0.3, 0.8, 0.2,  -0.3, 0.8, 0.2,
      
      -0.6, 0.0, -0.3,  0.6, 0.0, -0.3,  0.3, 0.8, -0.2,
      -0.6, 0.0, -0.3,  0.3, 0.8, -0.2, -0.3, 0.8, -0.2,
      
      // Multiple roots
      -0.3, 0.0, 0.15,  0.3, 0.0, 0.15,  0.15, -1.2, 0.1,
      -0.3, 0.0, -0.15, 0.3, 0.0, -0.15, -0.15, -1.2, -0.1,
    ]
    
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3))
    geometry.computeVertexNormals()
    
    return geometry
  }
  
  private createToothMaterials(condition: ToothGeometry['condition']): THREE.Material[] {
    const materials: THREE.Material[] = []
    
    switch (condition) {
      case 'healthy':
        materials.push(
          new THREE.MeshPhongMaterial({
            color: 0xFFFFF0, // Ivory white
            shininess: 30,
            transparent: true,
            opacity: 0.95
          })
        )
        break
        
      case 'cavity':
        materials.push(
          new THREE.MeshPhongMaterial({
            color: 0xFFFFF0,
            shininess: 30,
            transparent: true,
            opacity: 0.95
          }),
          new THREE.MeshPhongMaterial({
            color: 0x4A4A4A, // Dark cavity
            shininess: 5
          })
        )
        break
        
      case 'crown':
        materials.push(
          new THREE.MeshPhongMaterial({
            color: 0xE6E6FA, // Slightly different shade for crown
            shininess: 50,
            transparent: true,
            opacity: 0.98
          })
        )
        break
        
      case 'implant':
        materials.push(
          new THREE.MeshPhongMaterial({
            color: 0xC0C0C0, // Titanium implant
            shininess: 100,
            metalness: 0.8
          }),
          new THREE.MeshPhongMaterial({
            color: 0xFFFFF0, // Crown on implant
            shininess: 30
          })
        )
        break
        
      case 'veneer':
        materials.push(
          new THREE.MeshPhongMaterial({
            color: 0xFFFFFE, // Bright white veneer
            shininess: 60,
            transparent: true,
            opacity: 0.98
          })
        )
        break
        
      case 'root_canal':
        materials.push(
          new THREE.MeshPhongMaterial({
            color: 0xFFFFF0,
            shininess: 30,
            transparent: true,
            opacity: 0.95
          }),
          new THREE.MeshPhongMaterial({
            color: 0xFFD700, // Gold filling
            shininess: 80,
            metalness: 0.6
          })
        )
        break
        
      default:
        materials.push(
          new THREE.MeshPhongMaterial({
            color: 0xFFFFF0,
            shininess: 30
          })
        )
    }
    
    return materials
  }
  
  private applyConditionModifications(
    geometry: THREE.BufferGeometry, 
    condition: ToothGeometry['condition']
  ): void {
    switch (condition) {
      case 'cavity':
        // Add cavity indentations
        this.addCavityGeometry(geometry)
        break
        
      case 'crown':
        // Modify crown shape
        this.modifyCrownGeometry(geometry)
        break
        
      case 'implant':
        // Add implant post
        this.addImplantPost(geometry)
        break
        
      case 'veneer':
        // Slightly modify surface for veneer
        this.addVeneerLayer(geometry)
        break
        
      case 'root_canal':
        // Add filling geometry
        this.addFillingGeometry(geometry)
        break
    }
  }
  
  private addCavityGeometry(geometry: THREE.BufferGeometry): void {
    // Add small indentations to simulate cavities
    const positions = geometry.attributes.position.array as Float32Array
    
    // Modify some vertices to create cavity indentations
    for (let i = 0; i < positions.length; i += 9) {
      if (Math.random() < 0.1) { // 10% chance for cavity
        positions[i + 2] -= 0.05 // Indent Z coordinate
      }
    }
    
    geometry.attributes.position.needsUpdate = true
    geometry.computeVertexNormals()
  }
  
  private modifyCrownGeometry(geometry: THREE.BufferGeometry): void {
    // Slightly modify crown shape for artificial crown
    const positions = geometry.attributes.position.array as Float32Array
    
    for (let i = 0; i < positions.length; i += 3) {
      if (positions[i + 1] > 0.5) { // Crown area
        positions[i] *= 1.02 // Slightly wider
        positions[i + 1] *= 0.98 // Slightly shorter
      }
    }
    
    geometry.attributes.position.needsUpdate = true
    geometry.computeVertexNormals()
  }
  
  private addImplantPost(geometry: THREE.BufferGeometry): void {
    // Add titanium post geometry
    const positions = geometry.attributes.position.array as Float32Array
    const implantPost: number[] = []
    
    // Create cylindrical implant post
    for (let i = 0; i < 16; i++) {
      const angle = (i / 16) * Math.PI * 2
      const x = Math.cos(angle) * 0.1
      const z = Math.sin(angle) * 0.1
      
      implantPost.push(x, 0, z)
      implantPost.push(x, -0.8, z)
      implantPost.push(
        Math.cos((i + 1) / 16 * Math.PI * 2) * 0.1,
        -0.8,
        Math.sin((i + 1) / 16 * Math.PI * 2) * 0.1
      )
    }
    
    const newPositions = new Float32Array([...positions, ...implantPost])
    geometry.setAttribute('position', new THREE.BufferAttribute(newPositions, 3))
    geometry.computeVertexNormals()
  }
  
  private addVeneerLayer(geometry: THREE.BufferGeometry): void {
    // Add thin veneer layer to front surface
    const positions = geometry.attributes.position.array as Float32Array
    
    for (let i = 0; i < positions.length; i += 3) {
      if (positions[i + 2] > 0) { // Front face
        positions[i + 2] += 0.02 // Add veneer thickness
      }
    }
    
    geometry.attributes.position.needsUpdate = true
    geometry.computeVertexNormals()
  }
  
  private addFillingGeometry(geometry: THREE.BufferGeometry): void {
    // Add filling material geometry
    const positions = geometry.attributes.position.array as Float32Array
    const fillingVertices: number[] = []
    
    // Create small filling geometry
    fillingVertices.push(
      -0.1, 0.8, 0.05,  0.1, 0.8, 0.05,  0.0, 0.9, 0.0,
      -0.1, 0.8, -0.05, 0.1, 0.8, -0.05, 0.0, 0.9, 0.0
    )
    
    const newPositions = new Float32Array([...positions, ...fillingVertices])
    geometry.setAttribute('position', new THREE.BufferAttribute(newPositions, 3))
    geometry.computeVertexNormals()
  }
  
  private createToothAnimations(
    type: ToothGeometry['type'], 
    condition: ToothGeometry['condition']
  ): THREE.AnimationClip[] {
    const animations: THREE.AnimationClip[] = []
    
    // Rotation animation
    const rotationTrack = new THREE.VectorKeyframeTrack(
      '.rotation[y]',
      [0, 2, 4],
      [0, Math.PI, Math.PI * 2]
    )
    
    const rotationClip = new THREE.AnimationClip('rotation', 4, [rotationTrack])
    animations.push(rotationClip)
    
    // Highlight animation for interactive selection
    const scaleTrack = new THREE.VectorKeyframeTrack(
      '.scale',
      [0, 0.5, 1],
      [1, 1, 1, 1.1, 1.1, 1.1, 1, 1, 1]
    )
    
    const highlightClip = new THREE.AnimationClip('highlight', 1, [scaleTrack])
    animations.push(highlightClip)
    
    return animations
  }
  
  public getAvailableToothTypes(): ToothGeometry['type'][] {
    return ['incisor', 'canine', 'premolar', 'molar']
  }
  
  public getAvailableConditions(): ToothGeometry['condition'][] {
    return ['healthy', 'cavity', 'crown', 'implant', 'veneer', 'root_canal']
  }
  
  public clearCache(): void {
    this.geometryCache.clear()
  }
}

