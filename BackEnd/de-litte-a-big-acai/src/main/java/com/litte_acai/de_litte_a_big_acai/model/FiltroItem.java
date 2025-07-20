package com.litte_acai.de_litte_a_big_acai.model;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.Objects;

public class FiltroItem {
    private String filterNome;
    private String filterMarca;
    private String filterCategotia;
    private String comparaDataEntr;
    private LocalDateTime filterDataEntr;
    private String comparaDataValid;
    private LocalDateTime filterDataValidade;
    private String comparaPreco;
    private double filterPrecoUni;
    private String comparaQuant;
    private int filterQuant;
    private String comparaValortotal;
    private double filterValorTotal;
    private String comparaVol;
    private double filterVol;
    private String filterUnidMedida;
    private String filterLote;
    private String filterEnderecoArmazen;
    private String comparaDataSaid;
    private LocalDateTime filterDataSaid;
    private String filterMotivoSaida;
    private boolean filterEmEstoque;

    public FiltroItem() {
        this.filterNome = "";
        this.filterMarca = "";
        this.filterCategotia = "";
        this.comparaDataEntr = "";
        this.filterDataEntr = null;
        this.comparaDataValid = "";
        this.filterDataValidade = null;
        this.comparaPreco = "";
        this.filterPrecoUni = 0.0;
        this.comparaQuant = "";
        this.filterQuant = 0;
        this.comparaValortotal = "";
        this.filterValorTotal = 0;
        this.comparaVol = "";
        this.filterVol = 0;
        this.filterUnidMedida = "";
        this.filterLote = "";
        this.filterEnderecoArmazen = "";
        this.comparaDataSaid = "";
        this.filterDataSaid = null;
        this.filterMotivoSaida = "";
    }

    public String getFilterNome() {
        return filterNome;
    }

    public void setFilterNome(String filterNome) {
        if (filterNome != null && !filterNome.isBlank()) {
            this.filterNome = filterNome.trim().toLowerCase();
        }
    }

    public String getFilterMarca() {
        return filterMarca;
    }

    public void setFilterMarca(String filterMarca) {
        if (filterMarca != null && !filterMarca.isBlank()) {
            this.filterMarca = filterMarca.trim().toLowerCase();
        }
    }

    public String getFilterCategotia() {
        return filterCategotia;
    }

    public void setFilterCategotia(String filterCategotia) {
        if (filterCategotia != null && !filterCategotia.isBlank()) {
            this.filterCategotia = filterCategotia.trim().toLowerCase();
        }
    }

    public String getComparaDataEntr() {
        return comparaDataEntr;
    }

    public void setComparaDataEntr(String comparaDataEntr) {
        if (comparaDataEntr != null && !comparaDataEntr.isBlank()) {
            this.comparaDataEntr = comparaDataEntr.trim().toLowerCase();
        }
    }

    public LocalDateTime getFilterDataEntr() {
        return filterDataEntr;
    }

    public void setFilterDataEntr(LocalDate filterDataEntr) {
        if (filterDataEntr != null) {
            LocalTime currentTime = LocalTime.now();
            this.filterDataEntr = filterDataEntr.atTime(currentTime);
        }
    }

    public String getComparaDataValid() {
        return comparaDataValid;
    }

    public void setComparaDataValid(String comparaDataValid) {
        if (comparaDataValid != null && !comparaDataValid.isBlank()) {
            this.comparaDataValid = comparaDataValid.trim().toLowerCase();
        }
    }

    public LocalDateTime getFilterDataValidade() {
        return filterDataValidade;
    }

    public void setFilterDataValidade(LocalDate filterDataValidade) {
        if (filterDataValidade != null) {
            LocalTime currentTime = LocalTime.now();
            this.filterDataValidade = filterDataValidade.atTime(currentTime);
        }
    }

    public String getComparaPreco() {
        return comparaPreco;
    }

    public void setComparaPreco(String comparaPreco) {
        if (comparaPreco != null && !comparaPreco.isBlank()) {
            this.comparaPreco = comparaPreco.trim().toLowerCase();
        }
    }

    public Double getFilterPrecoUni() {
        return filterPrecoUni;
    }

    public void setFilterPrecoUni(Double filterPrecoUni) {
        if (filterPrecoUni != null) {
            this.filterPrecoUni = Double.valueOf(filterPrecoUni);
        }
    }

    public String getComparaQuant() {
        return comparaQuant;
    }

    public void setComparaQuant(String comparaQuant) {
        if (comparaQuant != null && !comparaQuant.isBlank()) {
            this.comparaQuant = comparaQuant.trim().toLowerCase();
        }
    }

    public Integer getFilterQuant() {
        return filterQuant;
    }

    public void setFilterQuant(Integer filterQuant) {
        if (filterQuant != null) {
            this.filterQuant = Integer.valueOf(filterQuant);
        }
    }

    public String getComparaValortotal() {
        return comparaValortotal;
    }

    public void setComparaValortotal(String comparaValortotal) {
        if (comparaValortotal != null && !comparaValortotal.isBlank()) {
            this.comparaValortotal = comparaValortotal.trim().toLowerCase();
        }
    }

    public Double getFilterValorTotal() {
        return filterValorTotal;
    }

    public void setFilterValorTotal(Double filterValorTotal) {
        if (filterValorTotal != null) {
            this.filterValorTotal = Double.valueOf(filterValorTotal);
        }
    }

    public String getComparaVol() {
        return comparaVol;
    }

    public void setComparaVol(String comparaVol) {
        if (comparaVol != null && !comparaVol.isBlank()) {
            this.comparaVol = comparaVol.trim().toLowerCase();
        }
    }

    public Double getFilterVol() {
        return filterVol;
    }

    public void setFilterVol(Double filterVol) {
        if (filterVol != null) {
            this.filterVol = Double.valueOf(filterVol);
        }
    }

    public String getFilterUnidMedida() {
        return filterUnidMedida;
    }

    public void setFilterUnidMedida(String filterUnidMedida) {
        if (filterUnidMedida != null && !filterUnidMedida.isBlank()) {
            this.filterUnidMedida = filterUnidMedida.trim().toLowerCase();
        }
    }

    public String getFilterLote() {
        return filterLote;
    }

    public void setFilterLote(String filterLote) {
        if (filterLote != null && !filterLote.isBlank()) {
            this.filterLote = filterLote.trim().toLowerCase();
        }
    }

    public String getFilterEnderecoArmazen() {
        return filterEnderecoArmazen;
    }

    public void setFilterEnderecoArmazen(String filterEnderecoArmazen) {
        if (filterEnderecoArmazen != null && !filterEnderecoArmazen.isBlank()) {
            this.filterEnderecoArmazen = filterEnderecoArmazen.trim().toLowerCase();
        }
    }

    public String getComparaDataSaid() {
        return comparaDataSaid;
    }

    public void setComparaDataSaid(String comparaDataSaid) {
        if (comparaDataSaid != null && !comparaDataSaid.isBlank()) {
            this.comparaDataSaid = comparaDataSaid.trim().toLowerCase();
        }
    }

    public LocalDateTime getFilterDataSaid() {
        return filterDataSaid;
    }

    public void setFilterDataSaid(LocalDate filterDataSaid) {
        if (filterDataSaid != null) {
            LocalTime currentTime = LocalTime.now();
            this.filterDataSaid = filterDataSaid.atTime(currentTime);
        }
    }

    public String getFilterMotivoSaida() {
        return filterMotivoSaida;
    }

    public void setFilterMotivoSaida(String filterMotivoSaida) {
        if (filterMotivoSaida != null && !filterMotivoSaida.isBlank()) {
            this.filterMotivoSaida = filterMotivoSaida.trim().toLowerCase();
        }
    }

    public boolean isFilterEmEstoque() {
        return filterEmEstoque;
    }

    public void setFilterEmEstoque(String filterEmEstoque) {
        if(Objects.equals(filterEmEstoque, "1")){
            this.filterEmEstoque = true;
        }else if(Objects.equals(filterEmEstoque, "0")){
            this.filterEmEstoque = false;
        }

    }
}
