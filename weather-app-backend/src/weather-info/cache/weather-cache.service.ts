import { Injectable } from '@nestjs/common';
import NodeCache from 'node-cache';

@Injectable()
export class WeatherCacheService {
    private rawCache = new NodeCache({ stdTTL: 300 }); // 5 minutes
    private processedCache = new NodeCache({ stdTTL: 300 });

    setRaw(cityId: string, data: any) {
        this.rawCache.set(cityId, data);
    }

    getRaw(cityId: string) {
        return this.rawCache.get(cityId);
    }

    setProcessed(cityId: string, data: any) {
        this.processedCache.set(cityId, data);
    }

    getProcessed(cityId: string) {
        return this.processedCache.get(cityId);
    }

    getCacheStatus(cityId: string) {
        return {
            raw: this.rawCache.has(cityId) ? 'HIT' : 'MISS',
            processed: this.processedCache.has(cityId) ? 'HIT' : 'MISS'
        };
    }

    // Get all cached city IDs from processed cache
    getAllCityIds(): string[] {
        return this.processedCache.keys();
    }

    // Get all processed cities data
    getAllProcessedCities(): any[] {
        const cityIds = this.getAllCityIds();
        return cityIds.map(cityId => {
            const processedData = this.getProcessed(cityId);
            return {
                cityId,
                ...(processedData || {})
            };
        });
    }

    // Update city data with new score and rank
    updateCityWithScoreAndRank(cityId: string, score: number, rank: number) {
        const existingData = this.getProcessed(cityId);
        if (existingData) {
            const updatedData = {
                ...existingData,
                comfortScore: score,
                rank: rank
            };
            this.setProcessed(cityId, updatedData);
        }
    }
}