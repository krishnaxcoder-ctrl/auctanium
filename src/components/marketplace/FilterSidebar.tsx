"use client";

import { useState } from "react";
import {
    ChevronDown,
    ChevronUp,
    Check,
    Star01,
    X,
} from "@untitledui/icons";
import { cx } from "@/utils/cx";
import { Button } from "@/components/base/buttons/button";

export interface FilterState {
    categories: string[];
    priceRange: [number, number];
    condition: string[];
    listingType: string[];
    sellerRating: number | null;
    freeShipping: boolean;
    endingSoon: boolean;
    newlyListed: boolean;
}

interface FilterSidebarProps {
    filters: FilterState;
    onFilterChange: (filters: FilterState) => void;
    onClearFilters: () => void;
    isMobile?: boolean;
    onClose?: () => void;
}

const categories = [
    { id: "art", label: "Art" },
    { id: "antiques", label: "Antiques" },
    { id: "jewelry", label: "Jewelry & Watches" },
    { id: "collectibles", label: "Collectibles" },
    { id: "fashion", label: "Fashion" },
    { id: "furniture", label: "Furniture" },
    { id: "coins", label: "Coins & Stamps" },
    { id: "books", label: "Books & Manuscripts" },
    { id: "ceramics", label: "Ceramics & Glass" },
    { id: "other", label: "Other" },
];

const budgetRanges = [
    { id: "0-100", label: "Under $100" },
    { id: "100-500", label: "$100 - $500" },
    { id: "500-1000", label: "$500 - $1,000" },
    { id: "1000-5000", label: "$1,000 - $5,000" },
    { id: "5000-10000", label: "$5,000 - $10,000" },
    { id: "10000-inf", label: "$10,000+" },
];

const dimensions = [
    { id: "small", label: "Small (< 30cm)" },
    { id: "medium", label: "Medium (30-60cm)" },
    { id: "large", label: "Large (60-120cm)" },
    { id: "xlarge", label: "Extra Large (> 120cm)" },
];

const reservePrices = [
    { id: "no-reserve", label: "No Reserve" },
    { id: "0-500", label: "Under $500" },
    { id: "500-2000", label: "$500 - $2,000" },
    { id: "2000-10000", label: "$2,000 - $10,000" },
    { id: "10000-inf", label: "$10,000+" },
];

const closingDates = [
    { id: "today", label: "Ending Today" },
    { id: "24h", label: "Next 24 Hours" },
    { id: "3days", label: "Next 3 Days" },
    { id: "7days", label: "Next 7 Days" },
    { id: "30days", label: "Next 30 Days" },
];

const locations = [
    { id: "us", label: "United States" },
    { id: "uk", label: "United Kingdom" },
    { id: "france", label: "France" },
    { id: "germany", label: "Germany" },
    { id: "italy", label: "Italy" },
    { id: "netherlands", label: "Netherlands" },
    { id: "asia", label: "Asia" },
    { id: "worldwide", label: "Worldwide" },
];

const brands = [
    { id: "rolex", label: "Rolex" },
    { id: "cartier", label: "Cartier" },
    { id: "omega", label: "Omega" },
    { id: "patek", label: "Patek Philippe" },
    { id: "chanel", label: "Chanel" },
    { id: "hermes", label: "Hermès" },
    { id: "tiffany", label: "Tiffany & Co." },
    { id: "other", label: "Other" },
];

const objects = [
    { id: "painting", label: "Painting" },
    { id: "sculpture", label: "Sculpture" },
    { id: "photograph", label: "Photograph" },
    { id: "print", label: "Print" },
    { id: "drawing", label: "Drawing" },
    { id: "mixed-media", label: "Mixed Media" },
    { id: "other", label: "Other" },
];

const countries = [
    { id: "france", label: "France" },
    { id: "italy", label: "Italy" },
    { id: "usa", label: "United States" },
    { id: "uk", label: "United Kingdom" },
    { id: "germany", label: "Germany" },
    { id: "china", label: "China" },
    { id: "japan", label: "Japan" },
    { id: "other", label: "Other" },
];

const materials = [
    { id: "oil", label: "Oil on Canvas" },
    { id: "bronze", label: "Bronze" },
    { id: "marble", label: "Marble" },
    { id: "gold", label: "Gold" },
    { id: "silver", label: "Silver" },
    { id: "porcelain", label: "Porcelain" },
    { id: "wood", label: "Wood" },
    { id: "other", label: "Other" },
];

const conditions = [
    { id: "excellent", label: "Excellent" },
    { id: "very-good", label: "Very Good" },
    { id: "good", label: "Good" },
    { id: "fair", label: "Fair" },
    { id: "restored", label: "Restored" },
];

const periods = [
    { id: "contemporary", label: "Contemporary (1970-Now)" },
    { id: "modern", label: "Modern (1860-1970)" },
    { id: "19th", label: "19th Century" },
    { id: "18th", label: "18th Century" },
    { id: "17th", label: "17th Century & Earlier" },
];

const subjects = [
    { id: "portrait", label: "Portrait" },
    { id: "landscape", label: "Landscape" },
    { id: "abstract", label: "Abstract" },
    { id: "still-life", label: "Still Life" },
    { id: "figurative", label: "Figurative" },
    { id: "other", label: "Other" },
];

const styles = [
    { id: "impressionism", label: "Impressionism" },
    { id: "modern", label: "Modern Art" },
    { id: "contemporary", label: "Contemporary" },
    { id: "art-deco", label: "Art Deco" },
    { id: "baroque", label: "Baroque" },
    { id: "renaissance", label: "Renaissance" },
    { id: "other", label: "Other" },
];

const techniques = [
    { id: "oil", label: "Oil Painting" },
    { id: "watercolor", label: "Watercolor" },
    { id: "acrylic", label: "Acrylic" },
    { id: "pastel", label: "Pastel" },
    { id: "engraving", label: "Engraving" },
    { id: "lithograph", label: "Lithograph" },
    { id: "other", label: "Other" },
];

const signatures = [
    { id: "signed", label: "Signed" },
    { id: "unsigned", label: "Unsigned" },
    { id: "attributed", label: "Attributed" },
];

const editions = [
    { id: "unique", label: "Unique Piece" },
    { id: "limited", label: "Limited Edition" },
    { id: "numbered", label: "Numbered" },
    { id: "open", label: "Open Edition" },
];

const colours = [
    { id: "multicolor", label: "Multicolor" },
    { id: "black", label: "Black" },
    { id: "white", label: "White" },
    { id: "blue", label: "Blue" },
    { id: "red", label: "Red" },
    { id: "green", label: "Green" },
    { id: "gold", label: "Gold" },
    { id: "other", label: "Other" },
];

const sellers = [
    { id: "professional", label: "Professional Dealer" },
    { id: "auction-house", label: "Auction House" },
    { id: "gallery", label: "Gallery" },
    { id: "private", label: "Private Seller" },
];

const artists = [
    { id: "picasso", label: "Pablo Picasso" },
    { id: "warhol", label: "Andy Warhol" },
    { id: "monet", label: "Claude Monet" },
    { id: "banksy", label: "Banksy" },
    { id: "dali", label: "Salvador Dalí" },
    { id: "other", label: "Other Artists" },
];

const eras = [
    { id: "ancient", label: "Ancient" },
    { id: "medieval", label: "Medieval" },
    { id: "renaissance", label: "Renaissance" },
    { id: "baroque", label: "Baroque" },
    { id: "victorian", label: "Victorian" },
    { id: "art-nouveau", label: "Art Nouveau" },
    { id: "art-deco", label: "Art Deco" },
    { id: "mid-century", label: "Mid-Century Modern" },
    { id: "contemporary", label: "Contemporary" },
];

interface FilterSectionProps {
    title: string;
    children: React.ReactNode;
    defaultOpen?: boolean;
}

function FilterSection({ title, children, defaultOpen = true }: FilterSectionProps) {
    const [isOpen, setIsOpen] = useState(defaultOpen);

    return (
        <div className="border-b border-secondary pb-4">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between py-2 text-sm font-semibold text-primary hover:text-brand-600 transition-colors"
            >
                {title}
                {isOpen ? (
                    <ChevronUp className="size-4 text-tertiary" />
                ) : (
                    <ChevronDown className="size-4 text-tertiary" />
                )}
            </button>
            {isOpen && <div className="mt-2">{children}</div>}
        </div>
    );
}

interface CheckboxItemProps {
    label: string;
    checked: boolean;
    onChange: () => void;
}

function CheckboxItem({ label, checked, onChange }: CheckboxItemProps) {
    return (
        <label className="flex items-center gap-3 py-1.5 px-2 rounded-lg cursor-pointer hover:bg-secondary transition-colors">
            <input
                type="checkbox"
                className="sr-only"
                checked={checked}
                onChange={onChange}
            />
            <div
                className={cx(
                    "size-4 rounded border-2 flex items-center justify-center transition-colors",
                    checked ? "bg-brand-600 border-brand-600" : "border-gray-300"
                )}
            >
                {checked && <Check className="size-3 text-white" />}
            </div>
            <span className="text-sm text-secondary">{label}</span>
        </label>
    );
}

export function FilterSidebar({
    filters,
    onFilterChange,
    onClearFilters,
    isMobile = false,
    onClose,
}: FilterSidebarProps) {
    const [customMinPrice, setCustomMinPrice] = useState("");
    const [customMaxPrice, setCustomMaxPrice] = useState("");

    // Local state for additional filters
    const [selectedBudget, setSelectedBudget] = useState<string[]>([]);
    const [selectedDimensions, setSelectedDimensions] = useState<string[]>([]);
    const [selectedReservePrice, setSelectedReservePrice] = useState<string[]>([]);
    const [selectedClosingDate, setSelectedClosingDate] = useState<string[]>([]);
    const [selectedLocation, setSelectedLocation] = useState<string[]>([]);
    const [selectedBrand, setSelectedBrand] = useState<string[]>([]);
    const [selectedObject, setSelectedObject] = useState<string[]>([]);
    const [selectedCountry, setSelectedCountry] = useState<string[]>([]);
    const [selectedMaterial, setSelectedMaterial] = useState<string[]>([]);
    const [selectedPeriod, setSelectedPeriod] = useState<string[]>([]);
    const [selectedSubject, setSelectedSubject] = useState<string[]>([]);
    const [selectedStyle, setSelectedStyle] = useState<string[]>([]);
    const [selectedTechnique, setSelectedTechnique] = useState<string[]>([]);
    const [selectedSignature, setSelectedSignature] = useState<string[]>([]);
    const [selectedEdition, setSelectedEdition] = useState<string[]>([]);
    const [selectedColour, setSelectedColour] = useState<string[]>([]);
    const [selectedSeller, setSelectedSeller] = useState<string[]>([]);
    const [selectedArtist, setSelectedArtist] = useState<string[]>([]);
    const [selectedEra, setSelectedEra] = useState<string[]>([]);

    const toggleFilter = (value: string, selected: string[], setSelected: React.Dispatch<React.SetStateAction<string[]>>) => {
        if (selected.includes(value)) {
            setSelected(selected.filter(v => v !== value));
        } else {
            setSelected([...selected, value]);
        }
    };

    const handleCategoryToggle = (categoryId: string) => {
        const newCategories = filters.categories.includes(categoryId)
            ? filters.categories.filter((c) => c !== categoryId)
            : [...filters.categories, categoryId];
        onFilterChange({ ...filters, categories: newCategories });
    };

    const handleConditionToggle = (conditionId: string) => {
        const newConditions = filters.condition.includes(conditionId)
            ? filters.condition.filter((c) => c !== conditionId)
            : [...filters.condition, conditionId];
        onFilterChange({ ...filters, condition: newConditions });
    };

    const handleListingTypeToggle = (typeId: string) => {
        const newTypes = filters.listingType.includes(typeId)
            ? filters.listingType.filter((t) => t !== typeId)
            : [...filters.listingType, typeId];
        onFilterChange({ ...filters, listingType: newTypes });
    };

    const handlePriceRangeSelect = (min: number, max: number) => {
        onFilterChange({ ...filters, priceRange: [min, max] });
    };

    const handleCustomPrice = () => {
        const min = parseFloat(customMinPrice) || 0;
        const max = parseFloat(customMaxPrice) || Infinity;
        onFilterChange({ ...filters, priceRange: [min, max] });
    };

    const handleRatingSelect = (rating: number | null) => {
        onFilterChange({ ...filters, sellerRating: rating });
    };

    return (
        <div
            className={cx(
                "bg-primary h-full",
                isMobile ? "p-4" : "pr-6"
            )}
        >
            {/* Mobile Header */}
            {isMobile && (
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-secondary">
                    <h2 className="text-lg font-semibold text-primary">Filters</h2>
                    <button
                        onClick={onClose}
                        className="p-2 -mr-2 text-tertiary hover:text-primary hover:bg-secondary rounded-lg transition-colors"
                    >
                        <X className="size-5" />
                    </button>
                </div>
            )}
            <div className="space-y-4">
                {/* Budget */}
                <FilterSection title="Budget" defaultOpen={false}>
                    <div className="space-y-1">
                        {budgetRanges.map((item) => (
                            <CheckboxItem key={item.id} label={item.label} checked={selectedBudget.includes(item.id)} onChange={() => toggleFilter(item.id, selectedBudget, setSelectedBudget)} />
                        ))}
                    </div>
                </FilterSection>

                {/* Dimensions */}
                <FilterSection title="Dimensions" defaultOpen={false}>
                    <div className="space-y-1">
                        {dimensions.map((item) => (
                            <CheckboxItem key={item.id} label={item.label} checked={selectedDimensions.includes(item.id)} onChange={() => toggleFilter(item.id, selectedDimensions, setSelectedDimensions)} />
                        ))}
                    </div>
                </FilterSection>

                {/* Category */}
                <FilterSection title="Category" defaultOpen={false}>
                    <div className="space-y-1 max-h-48 overflow-y-auto">
                        {categories.map((category) => (
                            <CheckboxItem
                                key={category.id}
                                label={category.label}
                                checked={filters.categories.includes(category.id)}
                                onChange={() => handleCategoryToggle(category.id)}
                            />
                        ))}
                    </div>
                </FilterSection>

                {/* Reserve Price */}
                <FilterSection title="Reserve price" defaultOpen={false}>
                    <div className="space-y-1">
                        {reservePrices.map((item) => (
                            <CheckboxItem key={item.id} label={item.label} checked={selectedReservePrice.includes(item.id)} onChange={() => toggleFilter(item.id, selectedReservePrice, setSelectedReservePrice)} />
                        ))}
                    </div>
                </FilterSection>

                {/* Closing Date */}
                <FilterSection title="Closing date" defaultOpen={false}>
                    <div className="space-y-1">
                        {closingDates.map((item) => (
                            <CheckboxItem key={item.id} label={item.label} checked={selectedClosingDate.includes(item.id)} onChange={() => toggleFilter(item.id, selectedClosingDate, setSelectedClosingDate)} />
                        ))}
                    </div>
                </FilterSection>

                {/* Location */}
                <FilterSection title="Location" defaultOpen={false}>
                    <div className="space-y-1 max-h-48 overflow-y-auto">
                        {locations.map((item) => (
                            <CheckboxItem key={item.id} label={item.label} checked={selectedLocation.includes(item.id)} onChange={() => toggleFilter(item.id, selectedLocation, setSelectedLocation)} />
                        ))}
                    </div>
                </FilterSection>

                {/* Brand */}
                <FilterSection title="Brand" defaultOpen={false}>
                    <div className="space-y-1 max-h-48 overflow-y-auto">
                        {brands.map((item) => (
                            <CheckboxItem key={item.id} label={item.label} checked={selectedBrand.includes(item.id)} onChange={() => toggleFilter(item.id, selectedBrand, setSelectedBrand)} />
                        ))}
                    </div>
                </FilterSection>

                {/* Object */}
                <FilterSection title="Object" defaultOpen={false}>
                    <div className="space-y-1">
                        {objects.map((item) => (
                            <CheckboxItem key={item.id} label={item.label} checked={selectedObject.includes(item.id)} onChange={() => toggleFilter(item.id, selectedObject, setSelectedObject)} />
                        ))}
                    </div>
                </FilterSection>

                {/* Country of Origin */}
                <FilterSection title="Country of origin" defaultOpen={false}>
                    <div className="space-y-1 max-h-48 overflow-y-auto">
                        {countries.map((item) => (
                            <CheckboxItem key={item.id} label={item.label} checked={selectedCountry.includes(item.id)} onChange={() => toggleFilter(item.id, selectedCountry, setSelectedCountry)} />
                        ))}
                    </div>
                </FilterSection>

                {/* Material */}
                <FilterSection title="Material" defaultOpen={false}>
                    <div className="space-y-1 max-h-48 overflow-y-auto">
                        {materials.map((item) => (
                            <CheckboxItem key={item.id} label={item.label} checked={selectedMaterial.includes(item.id)} onChange={() => toggleFilter(item.id, selectedMaterial, setSelectedMaterial)} />
                        ))}
                    </div>
                </FilterSection>

                {/* Condition */}
                <FilterSection title="Condition" defaultOpen={false}>
                    <div className="space-y-1">
                        {conditions.map((condition) => (
                            <CheckboxItem
                                key={condition.id}
                                label={condition.label}
                                checked={filters.condition.includes(condition.id)}
                                onChange={() => handleConditionToggle(condition.id)}
                            />
                        ))}
                    </div>
                </FilterSection>

                {/* Period */}
                <FilterSection title="Period" defaultOpen={false}>
                    <div className="space-y-1">
                        {periods.map((item) => (
                            <CheckboxItem key={item.id} label={item.label} checked={selectedPeriod.includes(item.id)} onChange={() => toggleFilter(item.id, selectedPeriod, setSelectedPeriod)} />
                        ))}
                    </div>
                </FilterSection>

                {/* Subject */}
                <FilterSection title="Subject" defaultOpen={false}>
                    <div className="space-y-1">
                        {subjects.map((item) => (
                            <CheckboxItem key={item.id} label={item.label} checked={selectedSubject.includes(item.id)} onChange={() => toggleFilter(item.id, selectedSubject, setSelectedSubject)} />
                        ))}
                    </div>
                </FilterSection>

                {/* Style */}
                <FilterSection title="Style" defaultOpen={false}>
                    <div className="space-y-1 max-h-48 overflow-y-auto">
                        {styles.map((item) => (
                            <CheckboxItem key={item.id} label={item.label} checked={selectedStyle.includes(item.id)} onChange={() => toggleFilter(item.id, selectedStyle, setSelectedStyle)} />
                        ))}
                    </div>
                </FilterSection>

                {/* Technique */}
                <FilterSection title="Technique" defaultOpen={false}>
                    <div className="space-y-1 max-h-48 overflow-y-auto">
                        {techniques.map((item) => (
                            <CheckboxItem key={item.id} label={item.label} checked={selectedTechnique.includes(item.id)} onChange={() => toggleFilter(item.id, selectedTechnique, setSelectedTechnique)} />
                        ))}
                    </div>
                </FilterSection>

                {/* Signature */}
                <FilterSection title="Signature" defaultOpen={false}>
                    <div className="space-y-1">
                        {signatures.map((item) => (
                            <CheckboxItem key={item.id} label={item.label} checked={selectedSignature.includes(item.id)} onChange={() => toggleFilter(item.id, selectedSignature, setSelectedSignature)} />
                        ))}
                    </div>
                </FilterSection>

                {/* Edition */}
                <FilterSection title="Edition" defaultOpen={false}>
                    <div className="space-y-1">
                        {editions.map((item) => (
                            <CheckboxItem key={item.id} label={item.label} checked={selectedEdition.includes(item.id)} onChange={() => toggleFilter(item.id, selectedEdition, setSelectedEdition)} />
                        ))}
                    </div>
                </FilterSection>

                {/* Colour */}
                <FilterSection title="Colour" defaultOpen={false}>
                    <div className="space-y-1 max-h-48 overflow-y-auto">
                        {colours.map((item) => (
                            <CheckboxItem key={item.id} label={item.label} checked={selectedColour.includes(item.id)} onChange={() => toggleFilter(item.id, selectedColour, setSelectedColour)} />
                        ))}
                    </div>
                </FilterSection>

                {/* Sold by */}
                <FilterSection title="Sold by" defaultOpen={false}>
                    <div className="space-y-1">
                        {sellers.map((item) => (
                            <CheckboxItem key={item.id} label={item.label} checked={selectedSeller.includes(item.id)} onChange={() => toggleFilter(item.id, selectedSeller, setSelectedSeller)} />
                        ))}
                    </div>
                </FilterSection>

                {/* Artist */}
                <FilterSection title="Artist" defaultOpen={false}>
                    <div className="space-y-1 max-h-48 overflow-y-auto">
                        {artists.map((item) => (
                            <CheckboxItem key={item.id} label={item.label} checked={selectedArtist.includes(item.id)} onChange={() => toggleFilter(item.id, selectedArtist, setSelectedArtist)} />
                        ))}
                    </div>
                </FilterSection>

                {/* Era */}
                <FilterSection title="Era" defaultOpen={false}>
                    <div className="space-y-1 max-h-48 overflow-y-auto">
                        {eras.map((item) => (
                            <CheckboxItem key={item.id} label={item.label} checked={selectedEra.includes(item.id)} onChange={() => toggleFilter(item.id, selectedEra, setSelectedEra)} />
                        ))}
                    </div>
                </FilterSection>

                {/* Active Filters */}
                {(() => {
                    const activeFilters: { label: string; onRemove: () => void }[] = [];

                    // Categories
                    filters.categories.forEach((catId) => {
                        const cat = categories.find((c) => c.id === catId);
                        if (cat) {
                            activeFilters.push({
                                label: cat.label,
                                onRemove: () => handleCategoryToggle(catId),
                            });
                        }
                    });

                    // Conditions
                    filters.condition.forEach((condId) => {
                        const cond = conditions.find((c) => c.id === condId);
                        if (cond) {
                            activeFilters.push({
                                label: cond.label,
                                onRemove: () => handleConditionToggle(condId),
                            });
                        }
                    });

                    // Quick Filters
                    if (filters.freeShipping) {
                        activeFilters.push({
                            label: "Free Shipping",
                            onRemove: () => onFilterChange({ ...filters, freeShipping: false }),
                        });
                    }
                    if (filters.endingSoon) {
                        activeFilters.push({
                            label: "Ending Soon",
                            onRemove: () => onFilterChange({ ...filters, endingSoon: false }),
                        });
                    }
                    if (filters.newlyListed) {
                        activeFilters.push({
                            label: "Newly Listed",
                            onRemove: () => onFilterChange({ ...filters, newlyListed: false }),
                        });
                    }

                    if (activeFilters.length === 0) return null;

                    return (
                        <div className="pt-4 border-t border-secondary">
                            <div className="flex items-center justify-between mb-3">
                                <span className="text-sm font-semibold text-primary">
                                    Active Filters ({activeFilters.length})
                                </span>
                                <button
                                    onClick={onClearFilters}
                                    className="text-sm text-brand-600 hover:text-brand-700 font-medium transition-colors"
                                >
                                    Clear All
                                </button>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {activeFilters.map((filter, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center gap-1.5 px-2.5 py-1 bg-brand-50 text-brand-700 rounded-full text-sm"
                                    >
                                        <span>{filter.label}</span>
                                        <button
                                            onClick={filter.onRemove}
                                            className="hover:bg-brand-100 rounded-full p-0.5 transition-colors"
                                        >
                                            <X className="size-3" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    );
                })()}
            </div>
        </div>
    );
}
