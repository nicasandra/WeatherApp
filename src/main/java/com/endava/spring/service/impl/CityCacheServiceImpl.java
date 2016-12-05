package com.endava.spring.service.impl;

import com.endava.spring.model.CityCache;
import com.endava.spring.repository.CityCacheRepository;
import com.endava.spring.service.CityCacheService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by nicasandra on 12/2/2016.
 */
@Service
public class CityCacheServiceImpl implements CityCacheService {

    @Autowired
    private CityCacheRepository cityCacheRepository;


    public CityCache create(CityCache cityCache) {
        return cityCacheRepository.save(cityCache);
    }

    public List<CityCache> findByNameContaining(String name) {
        return cityCacheRepository.findTopByNameContainingOrderBySaveDateDesc(name);
    }
}
