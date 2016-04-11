import * as path from "path";
import * as utils from "./utils";
import * as vlq from "./vlq";

export interface IndexMap {
    version: number;
    file: string;
    sections: Section[];
}

export interface Section {
    offset: {
        line: number;
        column: number;
    };
    url?: string;
    map?: SourceMap;
}

export interface SourceMap {
    version: number;
    file: string;
    sourceRoot: string;
    sources: string[];
    names: string[];
    mappings: string;
    sourcesContent?: string[];
    x_ms_scopes?: string;
    x_ms_locals?: string;
    x_ms_mediaTypes?: string[];
    x_ms_sourceMediaTypes?: string;
}

export interface ParsedSection {
    sectionIndex: number;
    generatedLine: number;
    generatedColumn: number;
    generatedFile?: string;
}

export interface Mapping {
    mappingIndex: number;
    sectionIndex: number;
    sectionMappingIndex: number;
    generatedLine: number;
    sectionGeneratedLine: number;
    generatedColumnOffset: number;
    generatedColumn: number;
    sectionGeneratedColumn: number;
    sourceIndexOffset?: number;
    source?: Source;
    sourceLineOffset?: number;
    sourceLine?: number;
    sourceColumnOffset?: number;
    sourceColumn?: number;
    nameIndexOffset?: number;
    name?: Name;
}

export interface GeneratedFile {
    url: string;
    content: string;
    lines: GeneratedLine[];
}

export interface GeneratedLine {
    line: number;
    segments: GeneratedSegment[];
}

export interface GeneratedSegment {
    mapping?: Mapping;
    line: number;
    startColumn: number;
    endColumn: number;
}

export interface Source {
    sourceIndex: number;
    sectionIndex: number;
    sectionSourceIndex: number;
    url: string;
    mediaType?: string;
}

export interface SourceFile {
    url: string;
    content: string;
    lines: SourceLine[];
    source: Source;
}

export interface SourceLine {
    line: number;
    segments: SourceSegment[];
}

export interface SourceSegment {
    mappings?: Mapping[];
    line: number;
    startColumn: number;
    endColumn: number;
    children?: SourceSegment[];
}

export interface Name {
    nameIndex: number;
    sectionIndex: number;
    sectionNameIndex: number;
    text: string;
}

export interface Scope {
    scopeIndex: number;
    sectionIndex: number;
    sectionScopeIndex: number;
    parent: Scope;
    startLine: number;
    startColumn: number;
    sectionStartLine: number;
    sectionStartColumn: number;
    endLine: number;
    endColumn: number;
    sectionEndLine: number;
    sectionEndColumn: number;
    nested: Scope[];
    locals: Local[];
}

export interface Local {
    localIndex: number;
    sectionIndex: number;
    sectionLocalIndex: number;
    scope: Scope;
    generatedName: Name;
    sourceName?: Name;
    isHidden: boolean;
    isRenamed: boolean;
}

export interface FileHost {
    readFile(name: string, encoding?: string): string;
    resolve(name: string, relativeName: string): string;
}

export interface ParsedSourceMap {
    mapFile: string;
    generatedFile: string;
    isIndexMap: boolean;
    getGeneratedContent(): string;
    getGeneratedFile(): GeneratedFile;
    getIndexMap(): IndexMap;
    getIndexMapContent(): string;
    getSourceMaps(): SourceMap[];
    getSourceMap(sectionIndex: number): SourceMap;
    getSourceMapContent(sectionIndex: number): string;
    getSourceMapGeneratedFileContent(sectionIndex: number): string;
    getSections(): ParsedSection[];
    getSection(sectionIndex: number): ParsedSection;
    getNames(): Name[];
    getNamesInSection(sectionIndex: number): Name[];
    getName(nameIndex: number): Name;
    getNameInSection(sectionIndex: number, sectionNameIndex: number): Name;
    getSources(): Source[];
    getSourcesInSection(sectionIndex: number): Source[];
    getSource(sourceIndex: number): Source;
    getSourceInSection(sectionIndex: number, sectionSourceIndex: number): Source;
    getSourceContent(sourceIndex: number): string;
    getSourceContentInSection(sectionIndex: number, sectionSourceIndex: number): string;
    getSourceFiles(): SourceFile[];
    getSourceFilesInSection(sectionIndex: number): SourceFile[];
    getSourceFile(sourceIndex: number): SourceFile;
    getSourceFileInSection(sectionIndex: number, sectionSourceIndex: number): SourceFile;
    getMappings(): Mapping[];
    getMappingsInSection(sectionIndex: number): Mapping[];
    getMapping(mappingIndex: number): Mapping;
    getMappingInSection(sectionIndex: number, sectionMappingIndex: number): Mapping;
    getMappingsAtGeneratedLine(generatedLine: number): Mapping[];
    getMappingAtGeneratedLocation(generatedLine: number, generatedColumn: number): Mapping;
    getMappingAtGeneratedLocationInSection(sectionIndex: number, sectionGeneratedLine: number, sectionGeneratedColumn: number): Mapping;
    getCandidateMappingsAtSourceLine(sourceIndex: number, sourceLine: number): Mapping[];
    getCandidateMappingsAtSourceLocation(sourceIndex: number, sourceLine: number, sourceColumn: number): Mapping[];
    getCandidateMappingsAtSourceLocationInSection(sectionIndex: number, sectionSourceIndex: number, sourceLine: number, sourceColumn: number): Mapping[];
    getScopes(topMost?: boolean): Scope[];
    getScopesInSection(sectionIndex: number, topMost?: boolean): Scope[];
    getScope(scopeIndex: number): Scope;
    getScopeInSection(sectionIndex: number, sectionScopeIndex: number): Scope;
    getNarrowestScopeAtGeneratedLocation(generatedLine: number, generatedColumn: number): Scope;
    getNarrowestScopeAtGeneratedLocationInSection(sectionIndex: number, sectionGeneratedLine: number, sectionGeneratedColumn: number): Scope;
    getCandidateNarrowestScopesAtSourceLocation(sourceIndex: number, sourceLine: number, sourceColumn: number): Scope[];
    getCandidateNarrowestScopesAtSourceLocationInSection(sectionIndex: number, sectionSourceIndex: number, sourceLine: number, sourceColumn: number): Scope[];
    getLocals(): Local[];
    getLocalsInSection(sectionIndex: number): Local[];
    getLocal(localIndex: number): Local;
    getLocalInSection(sectionIndex: number, sectionLocalIndex: number): Local;
    getLocalAtGeneratedLocationForGeneratedName(generatedLine: number, generatedColumn: number, generatedName: string): Local;
    getLocalAtGeneratedLocationInSectionForGeneratedName(sectionIndex: number, sectionGeneratedLine: number, sectionGeneratedColumn: number, generatedName: string): Local;
    getLocalAtGeneratedLocationForSourceName(generatedLine: number, generatedColumn: number, sourceName: string): Local;
    getLocalAtGeneratedLocationInSectionForSourceName(sectionIndex: number, sectionGeneratedLine: number, sectionGeneratedColumn: number, sourceName: string): Local;
    getCandidateLocalsAtSourceLocationForGeneratedName(sourceIndex: number, sourceLine: number, sourceColumn: number, generatedName: string): Local[];
    getCandidateLocalsAtSourceLocationForSourceName(sourceIndex: number, sourceLine: number, sourceColumn: number, sourceName: string): Local[];
    getCandidateLocalsAtSourceLocationInSectionForGeneratedName(sectionIndex: number, sectionSourceIndex: number, sourceLine: number, sourceColumn: number, generatedName: string): Local[];
    getCandidateLocalsAtSourceLocationInSectionForSourceName(sectionIndex: number, sectionSourceIndex: number, sourceLine: number, sourceColumn: number, sourceName: string): Local[];
    getMediaTypes(): string[];
    getMediaTypesInSection(sectionIndex: number): string[];
}

const enum CharacterCode {
    Comma = 44,
    Semicolon = 59,
    LessThan = 60,
    GreaterThan = 62
}

function getDefaultFileHost(): FileHost {
    return {
        readFile(name: string, encoding?: string) {
            return utils.readFile(name, encoding);
        },
        resolve(from: string, to: string) {
            return utils.resolve(from, to);
        }
    };
}

export function decode(mapFile: string, host: FileHost = getDefaultFileHost()): ParsedSourceMap {
    const mapRoot = utils.absolute(path.dirname(mapFile));
    const sections: ParsedSection[] = [];
    const sectionMaps: SourceMap[] = [];
    const sectionMapsGeneratedFileContent: string[] = [];
    const sectionMapsContent: string[] = [];
    const sectionNameOffsets: number[] = [];
    const sectionSourceOffsets: number[] = [];
    const sectionMappingOffsets: number[] = [];
    const sectionScopeOffsets: number[] = [];
    const sectionLocalOffsets: number[] = [];
    const sources: Source[] = [];
    const sourcesContent: string[] = [];
    const sourcesFile: SourceFile[] = [];
    const names: Name[] = [];
    const mappings: Mapping[] = [];
    const generatedMappingCache: Mapping[][] = [];
    const sourceMappingCache: Mapping[][][] = [];
    const sectionGeneratedMappingCache: Mapping[][][] = [];
    const scopes: Scope[] = [];
    const locals: Local[] = [];
    let generatedFileContent: string;
    let generatedFileObject: GeneratedFile;
    let lastSectionNameOffset = 0;
    let lastSectionSourceOffset = 0;
    let lastSectionMappingOffset = 0;
    let lastSectionScopeOffset = 0;
    let lastSectionLocalOffset = 0;
    let mapContent = host.readFile(mapFile);
    let map: IndexMap | SourceMap;
    let version: number;
    let generatedFile: string;

    try {
        map = <IndexMap | SourceMap>JSON.parse(utils.stripComments(mapContent));
    }
    catch (e) {
        throw new Error(`Failed to read the source map from '${mapFile}': ${e.message}`);
    }

    const isIndexMap = "sections" in map;

    if (isIndexMap) {
        decodeIndexMap(<IndexMap>map);
    } else {
        decodeSourceMap(<SourceMap>map);
    }

    return {
        mapFile,
        generatedFile,
        isIndexMap,
        getIndexMap,
        getIndexMapContent,
        getSourceMaps,
        getSourceMap,
        getSourceMapContent,
        getSourceMapGeneratedFileContent,
        getGeneratedFile,
        getGeneratedContent,
        getSections,
        getSection,
        getNames,
        getNamesInSection,
        getName,
        getNameInSection,
        getSources,
        getSourcesInSection,
        getSource,
        getSourceInSection,
        getSourceContent,
        getSourceContentInSection,
        getSourceFiles,
        getSourceFilesInSection,
        getSourceFile,
        getSourceFileInSection,
        getMappings,
        getMappingsInSection,
        getMapping,
        getMappingInSection,
        getMappingsAtGeneratedLine,
        getMappingAtGeneratedLocation,
        getMappingAtGeneratedLocationInSection,
        getCandidateMappingsAtSourceLine,
        getCandidateMappingsAtSourceLocation,
        getCandidateMappingsAtSourceLocationInSection,
        getScopes,
        getScopesInSection,
        getScope,
        getScopeInSection,
        getNarrowestScopeAtGeneratedLocation,
        getNarrowestScopeAtGeneratedLocationInSection,
        getCandidateNarrowestScopesAtSourceLocation,
        getCandidateNarrowestScopesAtSourceLocationInSection,
        getLocals,
        getLocalsInSection,
        getLocal,
        getLocalInSection,
        getLocalAtGeneratedLocationForGeneratedName,
        getLocalAtGeneratedLocationInSectionForGeneratedName,
        getLocalAtGeneratedLocationForSourceName,
        getLocalAtGeneratedLocationInSectionForSourceName,
        getCandidateLocalsAtSourceLocationForGeneratedName,
        getCandidateLocalsAtSourceLocationInSectionForGeneratedName,
        getCandidateLocalsAtSourceLocationForSourceName,
        getCandidateLocalsAtSourceLocationInSectionForSourceName,
        getMediaTypes,
        getMediaTypesInSection,
    };

    function decodeIndexMap(indexMap: IndexMap): void {
        version = indexMap.version;
        generatedFile = host.resolve(mapRoot, indexMap.file);
        for (let sectionIndex = 0; sectionIndex < indexMap.sections.length; sectionIndex++) {
            const section = indexMap.sections[sectionIndex];
            let sectionFile: string;
            let sectionMapContent: string;
            let sectionMap: SourceMap;
            if (section.map) {
                sectionMap = section.map;
                sectionMapContent = JSON.stringify(map, undefined, "  ");
                sectionFile = host.resolve(mapRoot, sectionMap.file);
            }
            else if (section.url) {
                const url = host.resolve(mapRoot, section.url);
                try {
                    sectionMapContent = host.readFile(url);
                    sectionMap = <SourceMap>JSON.parse(sectionMapContent);
                    sectionFile = host.resolve(mapRoot, sectionMap.file);
                } catch (e) {
                    sectionMapContent = "";
                }
            }

            const parsedSection: ParsedSection = {
                sectionIndex: sectionIndex,
                generatedFile: sectionFile,
                generatedLine: section.offset.line,
                generatedColumn: section.offset.column
            };

            if (sectionMap) {
                decodeSection(parsedSection, sectionMap, sectionMapContent);
            }
        }
    }

    function decodeSourceMap(sourceMap: SourceMap): void {
        version = sourceMap.version;
        generatedFile = host.resolve(mapRoot, sourceMap.file);
        const parsedSection: ParsedSection = {
            sectionIndex: 0,
            generatedLine: 0,
            generatedColumn: 0,
            generatedFile: generatedFile
        };

        decodeSection(parsedSection, sourceMap, mapContent);
    }

    function decodeSection(section: ParsedSection, sourceMap: SourceMap, mapContent: string): void {
        sections[section.sectionIndex] = section;
        sectionMaps[section.sectionIndex] = sourceMap;
        sectionMapsContent[section.sectionIndex] = mapContent;
        sectionNameOffsets[section.sectionIndex] = lastSectionNameOffset;
        sectionSourceOffsets[section.sectionIndex] = lastSectionSourceOffset;
        sectionMappingOffsets[section.sectionIndex] = lastSectionMappingOffset;
        sectionScopeOffsets[section.sectionIndex] = lastSectionScopeOffset;
        sectionLocalOffsets[section.sectionIndex] = lastSectionLocalOffset;
        decodeSectionSources(section, sourceMap);
        decodeSectionNames(section, sourceMap);
        decodeSectionMappings(section, sourceMap);
        decodeSectionScopes(section, sourceMap);
        decodeSectionLocals(section, sourceMap);
        decodeSectionMediaTypes(section, sourceMap);
    }

    function decodeSectionSources(section: ParsedSection, sourceMap: SourceMap): void {
        lastSectionSourceOffset += sourceMap.sources.length;
    }

    function decodeSectionNames(section: ParsedSection, sourceMap: SourceMap): void {
        if (sourceMap.names) {
            lastSectionNameOffset += sourceMap.names.length;
        }
    }

    function decodeSectionMappings(section: ParsedSection, sourceMap: SourceMap): void {
        const sectionNameOffset = sectionNameOffsets[section.sectionIndex];
        const sectionSourceOffset = sectionSourceOffsets[section.sectionIndex];
        const sectionMappingOffset = sectionMappingOffsets[section.sectionIndex];
        let generatedLine = section.generatedLine;
        let generatedColumn = section.generatedColumn;
        let sectionGeneratedLine = 0;
        let sectionGeneratedColumn = 0;
        let sectionNameIndex = 0;
        let sectionSourceIndex = 0;
        let sectionMappingIndex = 0;
        let sourceLine = 0;
        let sourceColumn = 0;
        let startPos = 0;
        for (let pos = 0; pos <= sourceMap.mappings.length; pos++) {
            const ch = sourceMap.mappings.charCodeAt(pos);
            if (ch === CharacterCode.Semicolon || ch === CharacterCode.Comma || isNaN(ch)) {
                if (pos > startPos) {
                    const segment = vlq.decodeChars(sourceMap.mappings, startPos, pos);
                    let generatedColumnOffset = segment[0];
                    generatedColumn += generatedColumnOffset;
                    sectionGeneratedColumn += generatedColumnOffset;
                    const mapping: Mapping = {
                        mappingIndex: sectionMappingOffset + sectionMappingIndex,
                        sectionIndex: section.sectionIndex,
                        sectionMappingIndex: sectionMappingIndex,
                        generatedLine: generatedLine,
                        sectionGeneratedLine: sectionGeneratedLine,
                        generatedColumnOffset: generatedColumnOffset,
                        generatedColumn: generatedColumn,
                        sectionGeneratedColumn: sectionGeneratedColumn,
                    };

                    const generatedLineCache = generatedMappingCache[generatedLine] || (generatedMappingCache[generatedLine] = []);
                    generatedLineCache.push(mapping);

                    const sectionGeneratedLocationCache = sectionGeneratedMappingCache[section.sectionIndex] || (sectionGeneratedMappingCache[section.sectionIndex] = []);
                    const sectionGeneratedLineCache = sectionGeneratedLocationCache[sectionGeneratedLine] || (sectionGeneratedLocationCache[sectionGeneratedLine] = []);
                    sectionGeneratedLineCache.push(mapping);

                    if (segment.length > 3) {
                        const sourceIndexOffset = segment[1];
                        sectionSourceIndex += sourceIndexOffset;
                        mapping.sourceIndexOffset = sourceIndexOffset;
                        mapping.source = getSourceInSection(section.sectionIndex, sectionSourceIndex);

                        const sourceLineOffset = segment[2];
                        sourceLine += sourceLineOffset;
                        mapping.sourceLineOffset = sourceLineOffset;
                        mapping.sourceLine = sourceLine;

                        const sourceColumnOffset = segment[3];
                        sourceColumn += sourceColumnOffset;
                        mapping.sourceColumnOffset = sourceColumnOffset;
                        mapping.sourceColumn = sourceColumn;

                        if (segment.length > 4) {
                            const nameIndexOffset = segment[4];
                            sectionNameIndex += nameIndexOffset;
                            mapping.nameIndexOffset = nameIndexOffset;
                            mapping.name = getNameInSection(section.sectionIndex, sectionNameIndex);
                        }

                        const sourceCache = sourceMappingCache[mapping.source.sourceIndex] || (sourceMappingCache[mapping.source.sourceIndex] = []);
                        const sourceLineCache = sourceCache[sourceLine] || (sourceCache[sourceLine] = []);
                        sourceLineCache.push(mapping);
                    }

                    mappings[mapping.mappingIndex] = mapping;
                    sectionMappingIndex++;
                }

                startPos = pos + 1;
            }

            if (ch === CharacterCode.Semicolon) {
                generatedColumn = 0;
                generatedLine++;
                sectionGeneratedColumn = 0;
                sectionGeneratedLine++;
            }
        }

        if (sourceMap.names) {
            lastSectionNameOffset += sourceMap.names.length;
        }
    }

    function decodeSectionScopes(section: ParsedSection, sourceMap: SourceMap): void {
        const scopesData = sourceMap.x_ms_scopes;
        if (!scopesData) return;

        let sectionScopeIndex: number = 0;
        let scopeIndex: number = 0;
        let line = section.generatedLine;
        let column = section.generatedColumn;
        let sectionLine: number = 0;
        let sectionColumn: number = 0;
        let parent: Scope;
        let current: Scope;
        let startPos = 0;
        for (let pos = 0; pos < scopesData.length; pos++) {
            const ch = scopesData.charCodeAt(pos);
            if (ch === CharacterCode.GreaterThan || ch === CharacterCode.LessThan) {
                if (pos > startPos) {
                    let segment = vlq.decodeChars(scopesData, startPos, pos);
                    let lineOffset = segment[0];
                    let columnOffset = segment[1];
                    line += lineOffset;
                    column += columnOffset;
                    sectionLine += lineOffset;
                    sectionColumn += columnOffset;
                    if (ch === CharacterCode.GreaterThan) {
                        // enter new scope
                        sectionScopeIndex++;
                        parent = current;
                        current = {
                            scopeIndex: lastSectionScopeOffset + sectionScopeIndex,
                            sectionIndex: section.sectionIndex,
                            sectionScopeIndex: sectionScopeIndex,
                            parent: parent,
                            startLine: line,
                            startColumn: column,
                            sectionStartLine: sectionLine,
                            sectionStartColumn: sectionColumn,
                            endLine: undefined,
                            endColumn: undefined,
                            sectionEndLine: undefined,
                            sectionEndColumn: undefined,
                            nested: [],
                            locals: []
                        };

                        if (parent) {
                            parent.nested.push(current);
                        }

                        scopes[current.scopeIndex] = current;
                    }
                    else if (ch === CharacterCode.LessThan) {
                        // exit current scope
                        current = parent;
                        current.endLine = line;
                        current.endColumn = column;
                        current.sectionEndLine = sectionLine;
                        current.sectionEndColumn = sectionColumn;
                        parent = current.parent;
                    }

                    startPos = pos + 1;
                }
            }
        }
        lastSectionScopeOffset = scopes.length;
    }

    function decodeSectionLocals(section: ParsedSection, sourceMap: SourceMap): void {
        const localsData = sourceMap.x_ms_locals;
        if (!localsData) return;

        let sectionScopeIndexOffset = sectionScopeOffsets[section.sectionIndex];
        let sectionNameIndexOffset = sectionNameOffsets[section.sectionIndex];
        let sectionScopeIndex = 0;
        let sectionNameIndex = 0;
        let sectionLocalIndex = 0;
        let names = sourceMap.names;
        let startPos = 0;
        for (let pos = 0; pos <= localsData.length; pos++) {
            const ch = localsData.charCodeAt(pos);
            if (ch === CharacterCode.Semicolon || ch === CharacterCode.Comma || isNaN(ch)) {
                if (startPos > pos) {
                    const segment = vlq.decodeChars(localsData, startPos, pos);
                    sectionLocalIndex++;
                    sectionNameIndex += segment[0];

                    const generatedName = getNameInSection(section.sectionIndex, sectionNameIndex);
                    const isHidden = segment.length === 1;
                    let sourceName: Name;
                    if (!isHidden) {
                        sectionNameIndex += segment[1];
                        sourceName = getNameInSection(section.sectionIndex, sectionNameIndex);
                    }

                    const isRenamed = !isHidden && generatedName.text !== sourceName.text;
                    const scope = scopes[sectionScopeIndexOffset + sectionScopeIndex];
                    const local: Local = {
                        localIndex: lastSectionLocalOffset + sectionLocalIndex,
                        sectionIndex: section.sectionIndex,
                        sectionLocalIndex: sectionLocalIndex,
                        scope: scope,
                        generatedName: generatedName,
                        sourceName: sourceName,
                        isHidden: isHidden,
                        isRenamed: isRenamed
                    };

                    locals[local.localIndex] = local;
                    scope.locals.push(local);
                    startPos = pos + 1;
                }

                if (ch === CharacterCode.Semicolon) {
                    sectionScopeIndex++;
                }
            }
        }
    }

    function decodeSectionMediaTypes(section: ParsedSection, sourceMap: SourceMap): void {
        const mediaTypesData = sourceMap.x_ms_mediaTypes;
        if (!mediaTypesData) return;

        let mediaTypeIndex = 0;
        let sourcesMediaTypeData = sourceMap.x_ms_sourceMediaTypes;
        let offsets: number[];
        if (sourcesMediaTypeData) {
            offsets = vlq.decodeChars(sourcesMediaTypeData, 0, sourcesMediaTypeData.length);
        }

        for (let sectionSourceIndex = 0; sectionSourceIndex < sourceMap.sources.length; sectionSourceIndex++) {
            if (offsets && sectionSourceIndex < offsets.length) {
                mediaTypeIndex += offsets[sectionSourceIndex];
            }

            let mediaType: string;
            if (mediaTypeIndex < mediaTypesData.length) {
                mediaType = mediaTypesData[mediaTypeIndex];
            }
            else {
                mediaType = mediaTypesData[mediaTypesData.length - 1];
            }

            const source = getSourceInSection(section.sectionIndex, sectionSourceIndex);
            source.mediaType = mediaType;
        }
    }

    function getIndexMap(): IndexMap {
        if (isIndexMap) {
            return <IndexMap>map;
        }
    }

    function getIndexMapContent(): string {
        if (isIndexMap) {
            return mapContent;
        }
    }

    function getSourceMaps(): SourceMap[] {
        return sectionMaps.slice();
    }

    function getSourceMap(sectionIndex: number): SourceMap {
        return sectionMaps[sectionIndex];
    }

    function getSourceMapContent(sectionIndex: number): string {
        return sectionMapsContent[sectionIndex];
    }

    function getGeneratedContent(): string {
        if (typeof generatedFileContent !== "string") {
            generatedFileContent = host.readFile(generatedFile);
        }

        return generatedFileContent;
    }

    function getGeneratedFile(): GeneratedFile {
        if (generatedFileObject !== undefined) {
            return generatedFileObject;
        }

        const content = getGeneratedContent();
        const lines = content.split(/\r\n?|\n/g);
        const generatedLines: GeneratedLine[] = [];

        for (let generatedLineNumber = 0; generatedLineNumber < lines.length; generatedLineNumber++) {
            const generatedLineText = lines[generatedLineNumber];
            const generatedSegments: GeneratedSegment[] = [];
            let generatedSegment: GeneratedSegment;
            for (let generatedColumn = 0; generatedColumn < generatedLineText.length; generatedColumn++) {
                const mapping = getMappingAtGeneratedLocation(generatedLineNumber, generatedColumn);
                if (mapping !== undefined || generatedColumn === 0) {
                    if (generatedSegment !== undefined) {
                        generatedSegment.endColumn = generatedColumn;
                    }

                    generatedSegment = {
                        mapping,
                        line: generatedLineNumber,
                        startColumn: generatedColumn,
                        endColumn: generatedLineText.length
                    };

                    generatedSegments.push(generatedSegment);
                }
            }

            const generatedLine: GeneratedLine = {
                line: generatedLineNumber,
                segments: generatedSegments
            };

            generatedLines.push(generatedLine);
        }

        generatedFileObject = {
            url: generatedFile,
            content,
            lines: generatedLines
        };

        return generatedFileObject;
    }

    function getSourceMapGeneratedFileContent(sectionIndex: number): string {
        if (sectionIndex in sectionMapsGeneratedFileContent) {
            return sectionMapsGeneratedFileContent[sectionIndex];
        }

        const sourceMap = sectionMaps[sectionIndex];
        if (sourceMap === map) {
            return getGeneratedContent();
        }
        else if (sourceMap) {
            const url = host.resolve(mapRoot, sourceMap.file);
            let content: string;
            try {
                content = host.readFile(url);
            }
            catch (e) {
                content = "";
            }

            sectionMapsGeneratedFileContent[sectionIndex] = content;
            return content;
        }
    }

    function getSections(): ParsedSection[] {
        return sections.slice();
    }

    function getSection(sectionIndex: number): ParsedSection {
        return sections[sectionIndex];
    }

    function getSectionForName(nameIndex: number): ParsedSection {
        let parsedSection: ParsedSection = sections[0];
        for (let sectionIndex = 1; sectionIndex < sectionNameOffsets.length; sectionIndex++) {
            if (sectionNameOffsets[sectionIndex] < nameIndex) {
                parsedSection = sections[sectionIndex];
            } else {
                break;
            }
        }
        return parsedSection;
    }

    function getNames(): Name[] {
        let result: Name[] = [];
        for (let sectionIndex = 0; sectionIndex < sections.length; sectionIndex++) {
            result = result.concat(getNamesInSection(sectionIndex));
        }

        return result;
    }

    function getNamesInSection(sectionIndex: number): Name[] {
        let result: Name[] = [];
        let sourceMap = getSourceMap(sectionIndex);
        if (sourceMap && sourceMap.names) {
            for (let sectionNameIndex = 0; sectionNameIndex < sourceMap.names.length; sectionNameIndex++) {
                result.push(getNameInSection(sectionIndex, sectionNameIndex));
            }
        }

        return result;
    }

    function getName(nameIndex: number): Name {
        if (nameIndex in names) {
            return names[nameIndex];
        }

        let parsedSection = getSectionForName(nameIndex);
        if (parsedSection) {
            let sectionNameIndex = nameIndex - sectionNameOffsets[parsedSection.sectionIndex];
            return getNameInSection(parsedSection.sectionIndex, sectionNameIndex);
        }
    }

    function getNameInSection(sectionIndex: number, sectionNameIndex: number): Name {
        let nameIndex = sectionNameOffsets[sectionIndex] + sectionNameIndex;
        if (nameIndex in names) {
            return names[nameIndex];
        }

        let sourceMap = sectionMaps[sectionIndex];
        if (sourceMap && sourceMap.names && sectionNameIndex < sourceMap.names.length) {
            let name: Name = {
                nameIndex: nameIndex,
                sectionIndex: sectionIndex,
                sectionNameIndex: sectionNameIndex,
                text: sourceMap.names[sectionNameIndex]
            };
            names[nameIndex] = name;
            return name;
        }
    }

    function getSectionForSource(sourceIndex: number): ParsedSection {
        let parsedSection = sections[0];
        for (let sectionIndex = 1; sectionIndex < sectionSourceOffsets.length; sectionIndex++) {
            if (sectionSourceOffsets[sectionIndex] < sourceIndex) {
                parsedSection = sections[sectionIndex];
            } else {
                break;
            }
        }
        return parsedSection;
    }

    function getSources(): Source[] {
        let result: Source[] = [];
        for (let sectionIndex = 0; sectionIndex < sections.length; sectionIndex++) {
            result = result.concat(getSourcesInSection(sectionIndex));
        }
        return result;
    }

    function getSourcesInSection(sectionIndex: number): Source[] {
        const result: Source[] = [];
        const sourceMap = getSourceMap(sectionIndex);
        if (sourceMap && sourceMap.sources) {
            for (let sectionSourceIndex = 0; sectionSourceIndex < sourceMap.sources.length; sectionSourceIndex++) {
                result.push(getSourceInSection(sectionIndex, sectionSourceIndex));
            }
        }
        return result;
    }

    function getSource(sourceIndex: number): Source {
        if (sourceIndex in sources) {
            return sources[sourceIndex];
        }

        const parsedSection = getSectionForSource(sourceIndex);
        if (parsedSection) {
            const sectionSourceIndex = sourceIndex - sectionSourceOffsets[parsedSection.sectionIndex];
            return getSourceInSection(parsedSection.sectionIndex, sectionSourceIndex);
        }
    }

    function getSourceInSection(sectionIndex: number, sectionSourceIndex: number): Source {
        const sourceIndex = sectionSourceOffsets[sectionIndex] + sectionSourceIndex;
        if (sourceIndex in sources) {
            return sources[sourceIndex];
        }

        const sourceMap = sectionMaps[sectionIndex];
        if (sourceMap && sourceMap.sources && sectionSourceIndex < sourceMap.sources.length) {
            let url = sourceMap.sources[sectionSourceIndex];
            if (!sourceMap.sourcesContent || typeof sourceMap.sourcesContent[sectionSourceIndex] !== "string") {
                if (sourceMap.sourceRoot) {
                    url = host.resolve(sourceMap.sourceRoot, url);
                }

                url = host.resolve(mapRoot, url);
            }

            const source: Source = {
                sourceIndex: sourceIndex,
                sectionIndex: sectionIndex,
                sectionSourceIndex: sectionSourceIndex,
                url: url
            };

            sources[sourceIndex] = source;
            return source;
        }
    }

    function getSourceContent(sourceIndex: number): string {
        if (sourceIndex in sourcesContent) {
            return sourcesContent[sourceIndex];
        }

        const parsedSection = getSectionForSource(sourceIndex);
        if (parsedSection) {
            const sectionSourceIndex = sourceIndex - sectionSourceOffsets[parsedSection.sectionIndex];
            return getSourceContentInSection(parsedSection.sectionIndex, sectionSourceIndex);
        }
    }

    function getSourceContentInSection(sectionIndex: number, sectionSourceIndex: number): string {
        const sourceIndex = sectionSourceOffsets[sectionIndex] + sectionSourceIndex;
        if (sourceIndex in sourcesContent) {
            return sourcesContent[sourceIndex];
        }

        const sourceMap = sectionMaps[sectionIndex];
        if (sourceMap && sourceMap.sources && sectionSourceIndex < sourceMap.sources.length) {
            let sourceContent: string;
            if (sourceMap.sourcesContent && sourceIndex < sourceMap.sourcesContent.length) {
                sourceContent = sourceMap.sourcesContent[sectionSourceIndex];
            }

            if (typeof sourceContent !== "string") {
                const source = getSourceInSection(sectionIndex, sectionSourceIndex);
                if (source) {
                    try {
                        sourceContent = host.readFile(source.url);
                    } catch (e) {
                    }
                }
            }

            sourcesContent[sourceIndex] = sourceContent;
            return sourceContent;
        }
    }

    function getSourceFiles(): SourceFile[] {
        const result: SourceFile[] = [];
        for (let sectionIndex = 0; sectionIndex < sections.length; sectionIndex++) {
            for (const sourceFile of getSourceFilesInSection(sectionIndex)) {
                result.push(sourceFile);
            }
        }

        return result;
    }

    function getSourceFilesInSection(sectionIndex: number): SourceFile[] {
        const result: SourceFile[] = [];
        const sourceMap = getSourceMap(sectionIndex);
        if (sourceMap && sourceMap.sources) {
            for (let sectionSourceIndex = 0; sectionSourceIndex < sourceMap.sources.length; sectionSourceIndex++) {
                result.push(getSourceFileInSection(sectionIndex, sectionSourceIndex));
            }
        }
        return result;
    }

    function getSourceFile(sourceIndex: number): SourceFile {
        if (sourceIndex in sourcesFile) {
            return sourcesFile[sourceIndex];
        }

        const parsedSection = getSectionForSource(sourceIndex);
        if (parsedSection) {
            const sectionSourceIndex = sourceIndex - sectionSourceOffsets[parsedSection.sectionIndex];
            return getSourceFileInSection(parsedSection.sectionIndex, sectionSourceIndex);
        }
    }

    function getSourceFileInSection(sectionIndex: number, sectionSourceIndex: number): SourceFile {
        const sourceIndex = sectionSourceOffsets[sectionIndex] + sectionSourceIndex;
        if (sourceIndex in sourcesContent) {
            return sourcesFile[sourceIndex];
        }

        const sourceMap = sectionMaps[sectionIndex];
        if (sourceMap && sourceMap.sources && sectionSourceIndex < sourceMap.sources.length) {
            const content = getSourceContentInSection(sectionIndex, sectionSourceIndex);
            if (content === undefined) {
                return undefined;
            }

            const lines = content.split(/\r\n?|\n/g);
            const sourceLines: SourceLine[] = [];

            for (let sourceLineNumber = 0; sourceLineNumber < lines.length; sourceLineNumber++) {
                const sourceLineText = lines[sourceLineNumber];
                const sourceSegments: SourceSegment[] = [];
                let sourceSegment: SourceSegment;
                for (let sourceColumn = 0; sourceColumn < sourceLineText.length; sourceColumn++) {
                    const mappings = getCandidateMappingsAtSourceLocation(sourceIndex, sourceLineNumber, sourceColumn);
                    if (mappings !== undefined || sourceColumn === 0) {
                        if (sourceSegment !== undefined) {
                            sourceSegment.endColumn = sourceColumn;
                        }

                        sourceSegment = {
                            mappings,
                            line: sourceLineNumber,
                            startColumn: sourceColumn,
                            endColumn: sourceLineText.length
                        };

                        sourceSegments.push(sourceSegment);
                    }
                }

                const sourceLine: SourceLine = {
                    line: sourceLineNumber,
                    segments: sourceSegments
                };

                sourceLines.push(sourceLine);
            }

            const sourceFileObject: SourceFile = {
                url: generatedFile,
                content,
                lines: sourceLines,
                source: getSourceInSection(sectionIndex, sectionSourceIndex)
            };

            sourcesFile[sourceIndex] = sourceFileObject;
            return sourceFileObject;
        }
    }

    function getMappings(): Mapping[] {
        return mappings.slice(0);
    }

    function getMappingsInSection(sectionIndex: number): Mapping[] {
        if (sectionIndex >= 0 && sectionIndex < sections.length) {
            const start = sectionMappingOffsets[sectionIndex];
            const end = sectionIndex + 1 < sections.length ? sectionMappingOffsets[sectionIndex + 1] : lastSectionMappingOffset;
            return mappings.slice(start, end);
        }

        return [];
    }

    function getMapping(mappingIndex: number): Mapping {
        return mappings[mappingIndex];
    }

    function getMappingInSection(sectionIndex: number, sectionMappingIndex: number): Mapping {
        const mappingIndex = sectionMappingOffsets[sectionIndex] + sectionMappingIndex;
        return getMapping(mappingIndex);
    }

    function getMappingsAtGeneratedLine(generatedLine: number): Mapping[] {
        const generatedLineCache = generatedMappingCache[generatedLine];
        if (generatedLineCache) {
            const result = generatedLineCache.slice();
            return result;
        }

        return [];
    }

    function getMappingAtGeneratedLocation(generatedLine: number, generatedColumn: number): Mapping {
        const generatedLineCache = generatedMappingCache[generatedLine];
        if (generatedLineCache) {
            for (let i = 0; i < generatedLineCache.length; i++) {
                const mapping = generatedLineCache[i];
                if (mapping.generatedColumn === generatedColumn) {
                    return mapping;
                }
            }
        }
    }

    function getMappingAtGeneratedLocationInSection(sectionIndex: number, sectionGeneratedLine: number, sectionGeneratedColumn: number): Mapping {
        const sectionGeneratedLocationCache = sectionGeneratedMappingCache[sectionIndex];
        if (sectionGeneratedLocationCache) {
            const sectionGeneratedLineCache = sectionGeneratedLocationCache[sectionGeneratedLine];
            if (sectionGeneratedLineCache) {
                return sectionGeneratedLineCache[sectionGeneratedColumn];
            }
        }
    }

    function getCandidateMappingsAtSourceLine(sourceIndex: number, sourceLine: number): Mapping[] {
        const sourceCache = sourceMappingCache[sourceIndex];
        if (sourceCache) {
            const sourceLineCache = sourceCache[sourceLine];
            if (sourceLineCache) {
                const result = sourceLineCache.slice();
                result.sort((x, y) => (x.sourceLine - y.sourceLine) || (x.sourceColumn - y.sourceColumn));
                return result;
            }
        }

        return [];
    }

    function getCandidateMappingsAtSourceLocation(sourceIndex: number, sourceLine: number, sourceColumn: number): Mapping[] {
        const mappings = getCandidateMappingsAtSourceLine(sourceIndex, sourceLine);
        const candidates = mappings.filter(mapping => mapping.sourceColumn === sourceColumn);
        return candidates;
    }

    function getCandidateMappingsAtSourceLocationInSection(sectionIndex: number, sectionSourceIndex: number, sourceLine: number, sourceColumn: number): Mapping[] {
        const sourceIndex = sectionSourceOffsets[sectionIndex] + sectionSourceIndex;
        return getCandidateMappingsAtSourceLocation(sourceIndex, sourceLine, sourceColumn);
    }

    function getScopes(topMost?: boolean): Scope[] {
        if (topMost) {
            return scopes.filter(scope => !!scope.parent);
        }

        return scopes.slice();
    }

    function getScopesInSection(sectionIndex: number, topMost?: boolean): Scope[] {
        if (sectionIndex >= 0 && sectionIndex < sections.length) {
            const start = sectionScopeOffsets[sectionIndex];
            const end = sectionIndex + 1 < sections.length ? sectionScopeOffsets[sectionIndex + 1] : lastSectionScopeOffset;
            let result = scopes.slice(start, end);
            if (topMost) {
                result = result.filter(scope => !!scope.parent);
            }

            return result;
        }

        return [];
    }

    function getScope(scopeIndex: number): Scope {
        return scopes[scopeIndex];
    }

    function getScopeInSection(sectionIndex: number, sectionScopeIndex: number): Scope {
        const scopeIndex = sectionScopeOffsets[sectionIndex] + sectionScopeIndex;
        return getScope(scopeIndex);
    }

    function getNarrowestScopeAtGeneratedLocation(generatedLine: number, generatedColumn: number): Scope {
        let narrowestScope: Scope;
        for (let scopeIndex = 0; scopeIndex < scopes.length; scopeIndex++) {
            const scope = scopes[scopeIndex];
            if (compareOffsets(scope.startLine, scope.startColumn, generatedLine, generatedColumn) > 0) {
                continue;
            }
            else if (compareOffsets(scope.endLine, scope.endColumn, generatedLine, generatedColumn) < 0) {
                continue;
            }

            if (!narrowestScope ||
                compareOffsets(narrowestScope.startLine, narrowestScope.startColumn, scope.startLine, scope.startColumn) < 0 ||
                compareOffsets(narrowestScope.endLine, narrowestScope.endColumn, scope.endLine, scope.endColumn) < 0) {
                narrowestScope = scope;
            }
        }

        return narrowestScope;
    }

    function getNarrowestScopeAtGeneratedLocationInSection(sectionIndex: number, sectionGeneratedLine: number, sectionGeneratedColumn: number): Scope {
        const scopes = getScopesInSection(sectionIndex);
        let narrowestScope: Scope;
        for (let scopeIndex = 0; scopeIndex < scopes.length; scopeIndex++) {
            const scope = scopes[scopeIndex];
            if (compareOffsets(scope.sectionStartLine, scope.sectionStartColumn, sectionGeneratedLine, sectionGeneratedColumn) > 0) {
                continue;
            }
            else if (compareOffsets(scope.sectionEndLine, scope.sectionEndColumn, sectionGeneratedLine, sectionGeneratedColumn) < 0) {
                continue;
            }

            if (!narrowestScope ||
                compareOffsets(narrowestScope.startLine, narrowestScope.startColumn, scope.startLine, scope.startColumn) < 0 ||
                compareOffsets(narrowestScope.endLine, narrowestScope.endColumn, scope.endLine, scope.endColumn) < 0) {
                narrowestScope = scope;
            }
        }

        return narrowestScope;
    }

    function getCandidateNarrowestScopesAtSourceLocation(sourceIndex: number, sourceLine: number, sourceColumn: number): Scope[] {
        const mappings = getCandidateMappingsAtSourceLocation(sourceIndex, sourceLine, sourceColumn);
        const seen: boolean[] = [];
        const result: Scope[] = [];
        mappings.forEach(mapping => {
            const scope = getNarrowestScopeAtGeneratedLocation(mapping.generatedLine, mapping.generatedColumn);
            if (!seen[scope.scopeIndex]) {
                seen[scope.scopeIndex] = true;
                result.push(scope);
            }
        });
        return result;
    }

    function getCandidateNarrowestScopesAtSourceLocationInSection(sectionIndex: number, sectionSourceIndex: number, sourceLine: number, sourceColumn: number): Scope[] {
        const sourceIndex = sectionSourceOffsets[sectionIndex] + sectionIndex;
        return getCandidateNarrowestScopesAtSourceLocation(sourceIndex, sourceLine, sourceColumn);
    }

    function getLocals(): Local[] {
        return locals.slice();
    }

    function getLocalsInSection(sectionIndex: number): Local[] {
        if (sectionIndex >= 0 && sectionIndex < sections.length) {
            const start = sectionLocalOffsets[sectionIndex];
            const end = sectionIndex + 1 < sections.length ? sectionLocalOffsets[sectionIndex + 1] : lastSectionLocalOffset;
            return locals.slice(start, end);
        }

        return [];
    }

    function getLocal(localIndex: number): Local {
        return locals[localIndex];
    }

    function getLocalInSection(sectionIndex: number, sectionLocalIndex: number): Local {
        const localIndex = sectionLocalOffsets[sectionIndex] + sectionLocalIndex;
        return getLocal(localIndex);
    }

    function getLocalAtGeneratedLocationForGeneratedName(generatedLine: number, generatedColumn: number, generatedName: string): Local {
        const scope = getNarrowestScopeAtGeneratedLocation(generatedLine, generatedColumn);
        if (scope) {
            for (let i = 0; i < scope.locals.length; i++) {
                const local = scope.locals[i];
                if (local.generatedName.text === generatedName) {
                    return local;
                }
            }
        }
    }

    function getLocalAtGeneratedLocationInSectionForGeneratedName(sectionIndex: number, sectionGeneratedLine: number, sectionGeneratedColumn: number, generatedName: string): Local {
        const scope = getNarrowestScopeAtGeneratedLocationInSection(sectionIndex, sectionGeneratedLine, sectionGeneratedColumn);
        if (scope) {
            for (let i = 0; i < scope.locals.length; i++) {
                const local = scope.locals[i];
                if (local.generatedName.text === generatedName) {
                    return local;
                }
            }
        }
    }

    function getLocalAtGeneratedLocationForSourceName(generatedLine: number, generatedColumn: number, sourceName: string): Local {
        const scope = getNarrowestScopeAtGeneratedLocation(generatedLine, generatedColumn);
        if (scope) {
            for (let i = 0; i < scope.locals.length; i++) {
                const local = scope.locals[i];
                if (local.sourceName && local.sourceName.text === sourceName) {
                    return local;
                }
            }
        }
    }

    function getLocalAtGeneratedLocationInSectionForSourceName(sectionIndex: number, sectionGeneratedLine: number, sectionGeneratedColumn: number, sourceName: string): Local {
        const scope = getNarrowestScopeAtGeneratedLocationInSection(sectionIndex, sectionGeneratedLine, sectionGeneratedColumn);
        if (scope) {
            for (let i = 0; i < scope.locals.length; i++) {
                const local = scope.locals[i];
                if (local.sourceName && local.sourceName.text === sourceName) {
                    return local;
                }
            }
        }
    }

    function getCandidateLocalsAtSourceLocationForGeneratedName(sourceIndex: number, sourceLine: number, sourceColumn: number, generatedName: string): Local[] {
        const mappings = getCandidateMappingsAtSourceLocation(sourceIndex, sourceLine, sourceColumn);
        const seen: boolean[] = [];
        const result: Local[] = [];
        mappings.forEach(mapping => {
            const local = getLocalAtGeneratedLocationForGeneratedName(mapping.generatedLine, mapping.generatedColumn, generatedName);
            if (!seen[local.localIndex]) {
                seen[local.localIndex] = true;
                result.push(local);
            }
        });
        return result;
    }

    function getCandidateLocalsAtSourceLocationInSectionForGeneratedName(sectionIndex: number, sectionSourceIndex: number, sourceLine: number, sourceColumn: number, generatedName: string): Local[] {
        const mappings = getCandidateMappingsAtSourceLocationInSection(sectionIndex, sectionSourceIndex, sourceLine, sourceColumn);
        const seen: boolean[] = [];
        const result: Local[] = [];
        mappings.forEach(mapping => {
            const local = getLocalAtGeneratedLocationForGeneratedName(mapping.generatedLine, mapping.generatedColumn, generatedName);
            if (!seen[local.localIndex]) {
                seen[local.localIndex] = true;
                result.push(local);
            }
        });
        return result;
    }

    function getCandidateLocalsAtSourceLocationForSourceName(sourceIndex: number, sourceLine: number, sourceColumn: number, sourceName: string): Local[] {
        const mappings = getCandidateMappingsAtSourceLocation(sourceIndex, sourceLine, sourceColumn);
        const seen: boolean[] = [];
        const result: Local[] = [];
        mappings.forEach(mapping => {
            const local = getLocalAtGeneratedLocationForSourceName(mapping.generatedLine, mapping.generatedColumn, sourceName);
            if (!seen[local.localIndex]) {
                seen[local.localIndex] = true;
                result.push(local);
            }
        });
        return result;
    }

    function getCandidateLocalsAtSourceLocationInSectionForSourceName(sectionIndex: number, sectionSourceIndex: number, sourceLine: number, sourceColumn: number, sourceName: string): Local[] {
        const mappings = getCandidateMappingsAtSourceLocationInSection(sectionIndex, sectionSourceIndex, sourceLine, sourceColumn);
        const seen: boolean[] = [];
        const result: Local[] = [];
        mappings.forEach(mapping => {
            const local = getLocalAtGeneratedLocationForSourceName(mapping.generatedLine, mapping.generatedColumn, sourceName);
            if (!seen[local.localIndex]) {
                seen[local.localIndex] = true;
                result.push(local);
            }
        });
        return result;
    }

    function getMediaTypes(): string[] {
        let result: string[] = [];
        for (let sectionIndex = 0; sectionIndex <= sections.length; sectionIndex++) {
            result = result.concat(getMediaTypesInSection(sectionIndex));
        }

        return result;
    }

    function getMediaTypesInSection(sectionIndex: number): string[] {
        const sourceMap = getSourceMap(sectionIndex);
        if (sourceMap && sourceMap.x_ms_mediaTypes) {
            return sourceMap.x_ms_mediaTypes.slice();
        }

        return [];
    }

    function compareOffsets(line1: number, column1: number, line2: number, column2: number): number {
        if (line1 < line2) {
            return -1;
        }
        else if (line1 > line2) {
            return +1;
        }
        else if (column1 < column2) {
            return -1;
        }
        else if (column1 > column2) {
            return +1;
        }

        return 0;
    }
}