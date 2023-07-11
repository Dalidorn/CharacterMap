import Level from './Level.js';

export default class Character {
    constructor(name, icon, abilityScores, alignment, race, age, gender, languages, feats, traits) {
        this.name = name;
        this.levels = [];
        this.classes = [];
        this.icon = icon;
        this.abilityScores = abilityScores;
        this.alignment = alignment;
        this.race = race;
        this.age = age;
        this.gender = gender;
        this.languages = languages;
        this.feats = feats;
        this.traits = traits;

        // Create Starting Level Templates
        for (let i = 1; i <= 20; i++) {
            const level = new Level(i);
            this.levels.push(level);
        }

        // Calculate Character Stats
        this.baseAttack = this.calculateBaseAttack;
        this.saves = this.calculateSaves;
        this.skills = this.calculateSkills;
        this.hitPoints = this.calculateHitPoints;
        this.CMD = this.calculateCMD;
        this.CMB = this.calculateCMB;
        this.AC = this.calculateAC;
        this.initiative = this.calculateInitiative;
        this.casterLevel = this.calculateCasterLevel;
    }

    calculateBaseAttack() {
    }

    calculateSaves() {
    }

    calculateSkills() {
    }

    calculateHitPoints() {
    }

    calculateCMD() {
    }

    calculateCMB() {
    }

    calculateAC() {
    }

    calculateInitiative() {
    }

    calculateCasterLevel() {
    }
}