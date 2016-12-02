package com.endava.spring.service;

import com.endava.spring.model.CityCache;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by nicasandra on 12/2/2016.
 */
@Service
public interface CityCacheService {
    CityCache create(CityCache cityCache);

    List<CityCache> findByNameContaining(String name);
}
